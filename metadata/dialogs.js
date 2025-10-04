// =================================================================
// dialogs.js: EXPORTED MODULE
// Chứa tất cả các lớp cơ sở, lớp con, Factory và Data Store.
// =================================================================

/**
 * UTILITY FUNCTIONS (Hàm tiện ích)
 */
export function convertImageFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                
                ctx.drawImage(img, 0, 0);
                
                // Nén và chuyển sang JPEG với chất lượng 80%
                const base64String = canvas.toDataURL('image/jpeg', 0.8);
                resolve(base64String);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


/**
 * CLASS QUẢN LÝ DỮ LIỆU (JsonDataStore)
 */
export class JsonDataStore {
    constructor() {
        this.history = [];
        this.onChangeCallback = () => {}; 
    }

    _sortByPage() {
        this.history.sort((a, b) => (a.page || 0) - (b.page || 0));
    }

    addItem(data) {
        this.history.push(data);
        this._sortByPage();
        this.onChangeCallback(this.history.length);
    }
    
    updateItem(data) {
        const index = this.history.findIndex(item => item.id === data.id);
        if (index !== -1) {
            this.history[index] = data; 
            this._sortByPage();
            this.onChangeCallback(this.history.length);
            return true;
        }
        return false;
    }

    getHistory() {
        return this.history;
    }

    getCount() {
        return this.history.length;
    }
    
    findItemById(id) {
        return this.history.find(item => item.id === id);
    }
    
    removeItemById(id) {
        const initialCount = this.history.length;
        this.history = this.history.filter(item => item.id !== id);
        
        if (this.history.length < initialCount) {
             this._sortByPage(); 
             this.onChangeCallback(this.history.length);
             return true;
        }
        return false;
    }

    clearHistory() {
        this.history = [];
        this.onChangeCallback(0);
    }
    
    setOnChange(callback) {
        this.onChangeCallback = callback;
        this.onChangeCallback(this.history.length); 
    }
}


/**
 * CLASS CƠ SỞ CHUNG (BaseDialogTemplate)
 */
export class BaseDialogTemplate {
    constructor(containerId, templateNumber, color) {
        this.templateNumber = templateNumber; 
        this.color = color;
        this.modalId = `dialog-${this.templateNumber}-` + crypto.randomUUID();
        this.contentId = this.modalId + '-content';
        this.closeBtnId = this.modalId + '-close';
        this.okBtnId = this.modalId + '-ok';
        
        this.editingId = null; 
        
        this.numberInputId = this.modalId + '-number-input';
        this.inputId = this.modalId + '-input';
        this.detailId = this.modalId + '-detail';
        
        this.addItemBtnId = this.modalId + '-add';
        this.listContainerId = this.modalId + '-list-container';
        this.items = []; 

        this.container = document.getElementById(containerId);
        this.modalElement = null;
        this.numberInputElement = null; 
        this.inputElement = null;
        this.detailElement = null; 
        this.okButton = null;
        this.listContainer = null;
        this.addItemBtn = null;

        if (!this.container) {
            console.error(`Không tìm thấy container với ID: ${containerId}. Dialog sẽ không hoạt động.`);
            return;
        }

        this._render();
        this._addItem(""); 
    }
    
    // Phương thức trả về HTML chung cho Modal
    _getModalHTML() {
        const titleColor = this.color; 
        
        const baseContent = `
            <!-- Backdrop/Overlay (ID: ${this.modalId}) -->
            <div id="${this.modalId}" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 opacity-0 hidden">
                
                <!-- Nội dung Popup (ID: ${this.contentId}) -->
                <div id="${this.contentId}" class="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 transform transition-transform duration-300 scale-95 max-h-[90vh] overflow-y-auto">
                    
                    <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                        Nhập liệu bằng Class Template ${this.templateNumber} (${this.color})
                    </h2>
                    
                    <!-- 0. Số trang/slide (Number Input) -->
                    <p class="text-gray-700 mb-2 font-medium">0. Số trang/slide:</p>
                    <input type="number" id="${this.numberInputId}" placeholder="Nhập số trang hoặc số slide..." value="1"
                        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${titleColor}-500 transition duration-150"
                    />

                    <!-- 1. Tiêu đề (Input Text) -->
                    <p class="text-gray-700 mb-2 font-medium">1. Tiêu đề:</p>
                    <input type="text" id="${this.inputId}" placeholder="Nhập tiêu đề (Title)..." 
                        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${titleColor}-500 transition duration-150"
                    />

                    <!-- KHU VỰC NỘI DUNG ĐẶC BIỆT SẼ ĐƯỢC THÊM VÀO ĐÂY BỞI CLASS CON -->
                    
                    <!-- 2. Chi tiết (Textarea) -->
                    <p class="text-gray-700 mb-2 font-medium">2. Chi tiết (Detail):</p>
                    <textarea id="${this.detailId}" placeholder="Nhập nội dung chi tiết..." rows="4"
                        class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${titleColor}-500 transition duration-150 resize-none"
                    ></textarea>
                    
                    <!-- 3. Danh sách Items -->
                    <p class="text-gray-700 mb-2 font-medium">3. Danh sách mục (Items):</p>
                    <div id="${this.listContainerId}" class="space-y-2 mb-4 p-2 border border-gray-200 rounded-lg bg-gray-50">
                        <!-- Các items sẽ được chèn ở đây bởi _renderList() -->
                    </div>
                    <button type="button" id="${this.addItemBtnId}" class="w-full p-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-200 shadow-md flex items-center justify-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        <span>Thêm Mục</span>
                    </button>


                    
                    <!-- Nút Hủy (Cancel) và Nút OK -->
                    <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                        <button id="${this.closeBtnId}" class="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition duration-200 shadow-md">
                            Hủy
                        </button>
                        <!-- Nút OK (Sự kiện sẽ được gắn bên ngoài) -->
                        <button id="${this.okBtnId}" class="px-6 py-2 bg-${titleColor}-600 text-white font-medium rounded-lg hover:bg-${titleColor}-700 transition duration-200 shadow-md">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        `;
        return baseContent;
    }

    _render() {
        this.container.insertAdjacentHTML('beforeend', this._getModalHTML());
        this.modalElement = document.getElementById(this.modalId);
        this.numberInputElement = document.getElementById(this.numberInputId);
        this.inputElement = document.getElementById(this.inputId);
        this.detailElement = document.getElementById(this.detailId); 
        this.okButton = document.getElementById(this.okBtnId);
        
        this.listContainer = document.getElementById(this.listContainerId);
        this.addItemBtn = document.getElementById(this.addItemBtnId);

        this._renderSpecialElements();

        this._setupEventListeners();
        this._addItem(""); 
    }
    
    _renderSpecialElements() {
        // Base class không làm gì
    }


    _setupEventListeners() {
        const closeButton = document.getElementById(this.closeBtnId);
        if (closeButton) {
            closeButton.addEventListener('click', this.close.bind(this));
        }

        if (this.modalElement) {
            this.modalElement.addEventListener('click', (event) => {
                if (event.target === this.modalElement) {
                    this.close();
                }
            });
            this.modalElement.addEventListener('click', this._handleModalClick.bind(this));
            this.modalElement.addEventListener('input', this._handleModalInput.bind(this));
        }
        
        if (this.addItemBtn) {
            this.addItemBtn.addEventListener('click', () => this._addItem(''));
        }
        
        document.addEventListener('keydown', this._handleEscapeKey);
    }
    
    _handleModalClick(event) {
        const removeBtn = event.target.closest('[data-action="remove"]');
        if (removeBtn) {
            const order = parseInt(removeBtn.getAttribute('data-order'));
            this._removeItem(order);
        }
    }

    _handleModalInput(event) {
        if (event.target.classList.contains('list-item-input')) {
            const order = parseInt(event.target.getAttribute('data-order'));
            const newText = event.target.value;
            
            const item = this.items.find(item => item.order === order);
            if (item) {
                item.text = newText;
            }
        }
    }
    
    _reorderItems() {
        this.items = this.items.map((item, index) => ({
            ...item,
            order: index + 1 
        }));
    }
    
    _addItem(text = "") {
        const newOrder = this.items.length > 0 ? this.items[this.items.length - 1].order + 1 : 1;
        this.items.push({ order: newOrder, text: text });
        this._reorderItems(); 
        this._renderList();
    }
    
    _removeItem(orderToRemove) {
        this.items = this.items.filter(item => item.order !== orderToRemove);
        this._reorderItems(); 
        this._renderList();
    }
    
    _renderList() {
        if (!this.listContainer) return;
        this.listContainer.innerHTML = ''; 

        if (this.items.length === 0) {
            this.listContainer.innerHTML = '<p class="text-gray-500 text-sm italic p-2">Danh sách trống.</p>';
            return;
        }
        
        const titleColor = this.color; 
        
        this.items.forEach(item => {
            const itemId = `${this.modalId}-item-${item.order}`;
            const itemHtml = `
                <div data-order="${item.order}" class="flex items-start space-x-2 bg-white p-2 rounded-lg border border-gray-300 shadow-sm group">
                    <span class="text-sm font-semibold text-${titleColor}-600 mt-2 w-5 flex-shrink-0 text-left">
                        ${item.order}.
                    </span>
                    <input type="text" id="${itemId}" value="${item.text}" data-order="${item.order}" 
                        class="list-item-input flex-grow p-1 border-b border-gray-200 bg-transparent focus:outline-none focus:border-${titleColor}-500 transition duration-150" 
                        placeholder="Nội dung mục ${item.order}" />
                    <button type="button" data-action="remove" data-order="${item.order}" title="Xóa mục" 
                        class="remove-item-btn text-red-400 hover:text-red-600 p-1 mt-1 flex-shrink-0 opacity-70 group-hover:opacity-100 transition duration-150">
                        <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            `;
            this.listContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
    }
    
    _handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    
    loadDataForEdit(data) {
        this.editingId = data.id; 
        
        if (this.numberInputElement) { this.numberInputElement.value = data.page || 1; }
        if (this.inputElement) { this.inputElement.value = data.title || ''; }
        if (this.detailElement) { this.detailElement.value = data.detail || ''; }
        
        this.items = []; 
        if (data.content && Array.isArray(data.content)) {
            data.content.forEach(item => {
                if (item.text) {
                     this._addItem(item.text); 
                }
            });
        }
        if (this.items.length === 0) {
            this._addItem("");
        }
        this._renderList();
    }


    show() {
        if (!this.modalElement) return;

        this.modalElement.classList.remove('hidden');
        
        setTimeout(() => {
            const contentElement = document.getElementById(this.contentId);
            this.modalElement.classList.add('opacity-100');
            if (contentElement) {
                contentElement.classList.add('scale-100');
                contentElement.classList.remove('scale-95');
            }
            if (this.inputElement) {
                 this.inputElement.focus();
            }
        }, 10);
    }

    close() {
        if (!this.modalElement) return;

        const contentElement = document.getElementById(this.contentId);
        
        this.modalElement.classList.remove('opacity-100');
        if (contentElement) {
            contentElement.classList.remove('scale-100');
            contentElement.classList.add('scale-95');
        }

        setTimeout(() => {
            this.modalElement.classList.add('hidden');
            if (this.numberInputElement) { this.numberInputElement.value = '1'; } 
            if (this.inputElement) { this.inputElement.value = ''; }
            if (this.detailElement) { this.detailElement.value = ''; }
            
            this.editingId = null; 
            
            this.items = [];
            this._addItem(""); 
            this._resetSpecialElements();
        }, 300);
    }
    
    _resetSpecialElements() {
        // Base class không làm gì
    }

    getNumberInput() {
        return this.numberInputElement ? parseFloat(this.numberInputElement.value) || 0 : 0;
    }
    
    getTextTitle() {
        return this.inputElement ? this.inputElement.value.trim() : "";
    }
    
    getTextDetail() {
        return this.detailElement ? this.detailElement.value.trim() : "";
    }

    getListItems() {
        return this.items.map(item => ({
            order: item.order,
            text: item.text.trim()
        })).filter(item => item.text !== ''); 
    }

    getJsonData() {
        const data = {
            "id": this.editingId || crypto.randomUUID(), 
            "page": this.getNumberInput(),
            "template": String(this.templateNumber), 
            "title": this.getTextTitle(),
            "detail": this.getTextDetail(),
            "content": this.getListItems(), 
            "notes": "",
            "referenceImagesBase64": "", 
            "blocks": []
        };
        return data;
    }
}


/**
 * CLASS CON ĐẶC BIỆT 1: DialogTemplate1 (Thêm Mô tả đặc biệt)
 */
export class DialogTemplate1 extends BaseDialogTemplate {
    constructor(containerId, templateNumber, color) {
        super(containerId, templateNumber, color);
        
        this.specialDescriptionId = this.modalId + '-special-desc';
        this.specialDescriptionElement = null;
    }

    _getModalHTML() {
        const titleColor = this.color;
        
        const specialInputHtml = `
            <!-- Trường nhập liệu ĐẶC BIỆT (Chỉ có ở Template 1) -->
            <p class="text-gray-700 mb-2 font-medium border-t pt-4 mt-4">1.5. Mô tả Đặc Biệt:</p>
            <textarea id="${this.specialDescriptionId}" placeholder="Nhập mô tả chỉ dành cho template này (Special Description)..." rows="2"
                class="w-full p-3 mb-4 border border-indigo-300 bg-indigo-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-${titleColor}-500 transition duration-150 resize-none"
            ></textarea>
            <!-- KHU VỰC NỘI DUNG ĐẶC BIỆT SẼ ĐƯỢC THÊM VÀO ĐÂY BỞI CLASS CON -->
        `;
        
        let baseHtml = super._getModalHTML();

        const insertionPoint = `<!-- KHU VỰC NỘI DUNG ĐẶC BIỆT SẼ ĐƯỢC THÊM VÀO ĐÂY BỞI CLASS CON -->`;
        baseHtml = baseHtml.replace(insertionPoint, specialInputHtml);

        return baseHtml;
    }
    
    _renderSpecialElements() {
        this.specialDescriptionElement = document.getElementById(this.specialDescriptionId);
    }
    
    loadDataForEdit(data) {
        super.loadDataForEdit(data); 
        
        if (this.specialDescriptionElement) {
            this.specialDescriptionElement.value = data.specialDescription || '';
        }
    }
    
    _resetSpecialElements() {
        if (this.specialDescriptionElement) {
            this.specialDescriptionElement.value = '';
        }
    }

    getJsonData() {
        const data = super.getJsonData(); 

        data.specialDescription = this.specialDescriptionElement 
                                 ? this.specialDescriptionElement.value.trim() 
                                 : "";
        
        return data;
    }
}


/**
 * CLASS CON ĐẶC BIỆT 2: DialogTemplate2 (Thêm Tải Ảnh Base64)
 */
export class DialogTemplate2 extends BaseDialogTemplate {
    constructor(containerId, templateNumber, color) {
        super(containerId, templateNumber, color);
        
        this.imageFileId = this.modalId + '-image-file';
        this.imagePreviewId = this.modalId + '-image-preview';
        this.clearImageBtnId = this.modalId + '-clear-image-btn';

        this.imageFileElement = null;
        this.imagePreviewElement = null;
        this.clearImageButton = null;
        
        this.imageBase64 = ''; 
    }

    _getModalHTML() {
        const titleColor = this.color;
        
        const specialImageHtml = `
            <!-- Trường nhập liệu Tải Ảnh (Chỉ có ở Template 2) -->
            <p class="text-gray-700 mb-2 font-medium border-t pt-4 mt-4">1.5. Tải Ảnh (Base64):</p>
            <div class="p-3 mb-4 border border-${titleColor}-300 bg-${titleColor}-50 rounded-lg">
                <input type="file" id="${this.imageFileId}" accept="image/*" 
                    class="w-full text-gray-700 mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-${titleColor}-100 file:text-${titleColor}-700 hover:file:bg-${titleColor}-200 transition duration-150"
                />
                <div id="${this.imagePreviewId}" class="mt-3 hidden">
                    <img class="w-full h-auto max-h-48 object-contain rounded-lg shadow-md border border-gray-200" alt="Preview">
                    <p class="text-xs text-gray-500 mt-1">Ảnh đã được nén và chuyển sang Base64.</p>
                    <button type="button" id="${this.clearImageBtnId}" class="mt-2 px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
                        Xóa Ảnh
                    </button>
                </div>
            </div>
            <!-- KHU VỰC NỘI DUNG ĐẶC BIỆT SẼ ĐƯỢC THÊM VÀO ĐÂY BỞI CLASS CON -->
        `;
        
        let baseHtml = super._getModalHTML();

        const insertionPoint = `<!-- KHU VỰC NỘI DUNG ĐẶC BIỆT SẼ ĐƯỢC THÊM VÀO ĐÂY BỞI CLASS CON -->`;
        baseHtml = baseHtml.replace(insertionPoint, specialImageHtml);

        return baseHtml;
    }
    
    _renderSpecialElements() {
        this.imageFileElement = document.getElementById(this.imageFileId);
        this.imagePreviewElement = document.getElementById(this.imagePreviewId);
        this.clearImageButton = document.getElementById(this.clearImageBtnId);
        
        if (this.imageFileElement) {
            this.imageFileElement.addEventListener('change', this._handleImageUpload.bind(this));
        }
        if (this.clearImageButton) {
            this.clearImageButton.addEventListener('click', this._clearImage.bind(this));
        }
    }
    
    _handleImageUpload(event) {
        if (!event.target.files || event.target.files.length === 0) {
            this.imageBase64 = '';
            this._updateImagePreview();
            return; 
        }

        const file = event.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            this.imageBase64 = '';
            this._updateImagePreview();
            return;
        }
        
        convertImageFileToBase64(file)
            .then(base64 => {
                this.imageBase64 = base64;
                this._updateImagePreview();
            })
            .catch(error => {
                console.error("Lỗi xử lý hình ảnh:", error);
                this.imageBase64 = '';
                this._updateImagePreview();
                console.error("Không thể tải và xử lý hình ảnh. Vui lòng thử lại.");
            });
    }
    
    _clearImage() {
        this.imageBase64 = '';
        if (this.imageFileElement) {
            this.imageFileElement.value = ''; 
        }
        this._updateImagePreview();
    }

    _updateImagePreview() {
        if (this.imageBase64 && this.imagePreviewElement) {
            const img = this.imagePreviewElement.querySelector('img');
            if (img) {
                img.src = this.imageBase64;
            }
            this.imagePreviewElement.classList.remove('hidden');
        } else if (this.imagePreviewElement) {
            this.imagePreviewElement.classList.add('hidden');
        }
    }
    
    loadDataForEdit(data) {
        super.loadDataForEdit(data); 
        
        this.imageBase64 = data.referenceImagesBase64 || '';
        this._updateImagePreview();
        
        if (this.imageFileElement) {
            this.imageFileElement.value = '';
        }
    }
    
    _resetSpecialElements() {
        this._clearImage();
    }

    getJsonData() {
        const data = super.getJsonData(); 

        data.referenceImagesBase64 = this.imageBase64;
        
        return data;
    }
}


/**
 * CLASS FACTORY (DialogFactory)
 */
export class DialogFactory {
    static createDialogInstance(containerId, templateNumber, color) {
        if (templateNumber === '1') {
            console.log("Factory: Tạo instance Template 1 (Mô tả đặc biệt).");
            return new DialogTemplate1(containerId, templateNumber, color);
        }
        
        if (templateNumber === '2') {
            console.log("Factory: Tạo instance Template 2 (Tải ảnh Base64).");
            return new DialogTemplate2(containerId, templateNumber, color);
        }
        
        return new BaseDialogTemplate(containerId, templateNumber, color);
    }

    static initializeTemplates(containerId, templateConfigs, templateSelector, dialogInstances, updateOpenButtonColor) {
        let initialSelectedTemplate = null;

        for (const templateNumber in templateConfigs) {
            const color = templateConfigs[templateNumber];
            
            dialogInstances[templateNumber] = DialogFactory.createDialogInstance(containerId, templateNumber, color);
            
            const option = document.createElement('option');
            option.value = templateNumber;
            
            let description = '';
            if (templateNumber === '1') {
                 description = ' - CÓ MÔ TẢ ĐẶC BIỆT';
            } else if (templateNumber === '2') {
                 description = ' - CÓ TÍNH NĂNG TẢI ẢNH BASE64';
            }
            
            option.textContent = `Template ${templateNumber} (Màu ${color.charAt(0).toUpperCase() + color.slice(1)}${description})`;
            templateSelector.appendChild(option);
            
            if (!initialSelectedTemplate) {
                 initialSelectedTemplate = templateNumber;
            }
        }

        if (initialSelectedTemplate) {
             updateOpenButtonColor(templateConfigs[initialSelectedTemplate]);
        }
    }
}
