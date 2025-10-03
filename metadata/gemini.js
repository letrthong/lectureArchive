/**
 * Function to dynamically create a presentation slide-style layout:
 * Two images side-by-side (with captions), and Notes/Context below.
 * * @param {string} containerId - The ID of the target HTML element.
 * @param {Array<Object>} slidesData - Array of objects [{imageUrl: string, caption: string}] for the main content.
 * @param {string} notesText - Text content (can include HTML tags) for the notes/contextual box at the bottom.
 */
function addImageListAndNoteText(containerId, slidesData, notesText) {
	const container = document.getElementById(containerId);

	if (!container) {
		console.error(`Container with ID '${containerId}' not found.`);
		return;
	}

	// Xóa toàn bộ nội dung cũ của container
	container.innerHTML = '';
	
	// Cập nhật các class của container để tạo khung slide chuyên nghiệp
	container.classList.remove('grid', 'grid-cols-2'); // Xóa lớp grid cũ nếu có
	container.classList.add(
		'flex', 'flex-col', 'gap-4', 'rounded-xl', 'shadow-2xl', 'p-2', 'bg-white', 'mt-4', 'border', 'border-gray-100'
	);

	// --- 1. Tạo khối chứa Nội dung Chính (Hai Ảnh song song) ---
	const mainContentDiv = document.createElement('div');
	// Sử dụng Grid 2 cột cho hai hình ảnh
	// Stacks on mobile (grid-cols-1) and goes side-by-side on desktop (md:grid-cols-2)
	mainContentDiv.className = 'grid grid-cols-1 md:grid-cols-2 gap-10 items-start justify-items-center';
	
	// Lặp qua dữ liệu hình ảnh
	slidesData.slice(0, 2).forEach(data => { // Giới hạn chỉ hiển thị 2 hình ảnh
		const itemDiv = document.createElement('div');
		itemDiv.className = 'flex flex-col items-center text-center space-y-4 w-full';

		// 1a. Chèn Image
		const imageElement = document.createElement('img');
		imageElement.src = data.imageUrl;
		imageElement.alt = 'Slide Image';
		
		// Fallback URL nếu hình ảnh không load được
		imageElement.onerror = () => imageElement.src = `https://placehold.co/450x300/FCA5A5/DC2626?text=Image+Error`;
		
		// Kích thước hình ảnh
		imageElement.className = 'w-full h-auto object-cover rounded-lg shadow-xl max-w-sm';
		
		// 1b. Chèn Text/Caption (dưới hình ảnh)
		const captionDiv = document.createElement('div');
		captionDiv.className = 'text-gray-800 text-sm md:text-base font-medium space-y-1';
		captionDiv.innerHTML = data.caption;
		
		itemDiv.appendChild(imageElement);
		itemDiv.appendChild(captionDiv);
		mainContentDiv.appendChild(itemDiv);
	});

	container.appendChild(mainContentDiv);

	// --- 2. Chèn Notes/Context (Dưới) ---
	if (notesText) {
		const notesDiv = document.createElement('div');
		// Tạo phong cách box Ghi chú/Context (giống hộp màu xanh lá cây) // mt-4 p-6
		notesDiv.className = ' rounded-lg bg-green-50 border-l-4 border-green-500 shadow-inner';
		
		const notesTitle = document.createElement('p');
		notesTitle.textContent = 'Ghi chú / Ngữ cảnh:';
		notesTitle.className = 'font-bold text-green-700 mb-2';
		
		const notesContent = document.createElement('div');
		notesContent.className = 'text-gray-700 text-sm leading-relaxed';
		notesContent.innerHTML = notesText;

		notesDiv.appendChild(notesTitle);
		notesDiv.appendChild(notesContent);
		container.appendChild(notesDiv);
	}
}

// --- HÀM HỖ TRỢ: Tạo nhanh cấu trúc dữ liệu slidesData ---
function createSlideData(imageUrl, contentText) {
	return {
		imageUrl: imageUrl,
		caption: contentText
	};
}



  /**
 * Function to dynamically create a presentation slide-style layout:
 * Image on the left, Text on the right, and Notes/Context below.
 * * @param {string} containerId - The ID of the target HTML element.
 * @param {string} imageLeftUrl - URL of the image for the left side.
 * @param {string} contentRightText - Main text content (can include HTML tags) for the right side.
 * @param {string} notesText - Text content (can include HTML tags) for the notes/contextual box at the bottom.
 */
function addImagesLeftAndNote(containerId, imageLeftUrl, contentRightText, notesText) {
	const container = document.getElementById(containerId);

	if (!container) {
		console.error(`Container with ID '${containerId}' not found.`);
		return;
	}

	// Xóa toàn bộ nội dung cũ của container
	container.innerHTML = '';
	
	// Cập nhật các class của container để tạo khung slide chuyên nghiệp
	container.classList.remove('grid', 'grid-cols-2'); // Xóa lớp grid cũ nếu có
	container.classList.add(
		'flex', 'flex-col', 'gap-6', 'rounded-xl', 'shadow-2xl', 'p-8', 'bg-white', 'mt-8', 'border', 'border-gray-100'
	);

	// --- 1. Tạo khối chứa Nội dung Chính (Ảnh trái - Text phải) ---
	const mainContentDiv = document.createElement('div');
	// Sử dụng Grid 2 cột cho phần chính: Image (1 cột) | Text (1 cột)
	// Stacks on mobile (grid-cols-1) and goes side-by-side on desktop (md:grid-cols-2)
	mainContentDiv.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 items-start';
	
	// 1a. Chèn Image (Trái)
	const imageContainer = document.createElement('div');
	imageContainer.className = 'w-full flex justify-center md:justify-start'; // Center image on small screens
	
	const imageElement = document.createElement('img');
	imageElement.src = imageLeftUrl;
	imageElement.alt = 'Slide Presentation Image';
	
	// Fallback URL nếu hình ảnh không load được
	imageElement.onerror = () => imageElement.src = `https://placehold.co/600x400/6366F1/ffffff?text=Image+Error`;
	
	// Kích thước hình ảnh: w-full trong grid cell, max-w-lg để giới hạn kích thước tuyệt đối
	imageElement.className = 'w-full max-w-lg h-auto object-cover rounded-lg shadow-xl';
	imageContainer.appendChild(imageElement);
	mainContentDiv.appendChild(imageContainer);
	
	// 1b. Chèn Text (Phải)
	const textContainer = document.createElement('div');
	textContainer.className = 'flex flex-col space-y-4 pt-4 md:pt-0';
	textContainer.innerHTML = contentRightText; // Chèn HTML/Text
	mainContentDiv.appendChild(textContainer);

	container.appendChild(mainContentDiv);

	// --- 2. Chèn Notes/Context (Dưới) ---
	if (notesText) {
		const notesDiv = document.createElement('div');
		// Tạo phong cách box Ghi chú/Context (giống hộp màu xanh lá cây)
		notesDiv.className = 'mt-4 p-6 rounded-lg bg-green-50 border-l-4 border-green-500 shadow-inner';
		
		const notesTitle = document.createElement('p');
		notesTitle.textContent = 'Ghi chú / Ngữ cảnh:';
		notesTitle.className = 'font-bold text-green-700 mb-2';
		
		const notesContent = document.createElement('div');
		notesContent.className = 'text-gray-700 text-sm leading-relaxed';
		notesContent.innerHTML = notesText;

		notesDiv.appendChild(notesTitle);
		notesDiv.appendChild(notesContent);
		container.appendChild(notesDiv);
	}
}

/**
 * Function to dynamically create and insert explanatory text and images into the target container.
 * This version is limited to processing and displaying only the first four images (2x2 grid).
 * @param {string} containerId - The ID of the target HTML element.
 * @param {string} contentText - The explanatory text to display above the images.
 * @param {string[]} imageList - An array of URLs for the images to insert.
 */
function addImageList(containerId, contentText, imageList) {
	const container = document.getElementById(containerId);

	if (!container) {
		console.error(`Container with ID '${containerId}' not found.`);
		return;
	}

	// Xóa toàn bộ nội dung cũ của container
	container.innerHTML = '';
	
	// Cập nhật các class của container (sẽ áp dụng cho cả văn bản và hình ảnh)
	container.classList.add(
		'grid', 'grid-cols-2', 'gap-4', 'rounded-xl', 'shadow-lg', 'p-4', 'bg-white', 'mt-8' 
	);

	// 1. Tạo và chèn nội dung giải thích (contentText)
	if (contentText) {
		const textElement = document.createElement('h3');
		textElement.textContent = contentText;
		
		// Sử dụng col-span-2 để đảm bảo văn bản chiếm toàn bộ chiều rộng (2 cột)
		textElement.className = 'text-xl font-semibold text-gray-700 col-span-2 mb-4 text-center border-b pb-2'; 
		container.appendChild(textElement);
	}

	// Lặp qua danh sách URL hình ảnh, giới hạn chỉ lấy 4 phần tử đầu tiên (2x2 grid)
	imageList.slice(0, 4).forEach((srcUrl, index) => {
		const newImage = document.createElement('img');
		
		newImage.src = srcUrl;
		newImage.alt = `Dynamic image ${index + 1}`;
		
		// Fallback URL nếu hình ảnh không load được
		newImage.onerror = () => newImage.src = `https://placehold.co/400x300/FCA5A5/DC2626?text=Error+Loading+Image+${index + 1}`;

		// Tailwind classes: w-full đảm bảo hình ảnh lấp đầy ô grid của nó.
		newImage.className = 'w-full h-auto object-cover rounded-xl shadow-xl transition-transform duration-300 hover:scale-[1.03] cursor-pointer';

		container.appendChild(newImage);
	});
}




/**
 * Function to create a generic two-column comparison layout (left and right blocks).
 * NOTE: This function is kept but not called in the final demo.
 * @param {string} containerId - The ID of the target HTML element.
 * @param {string} leftTitle - Title for the left column.
 * @param {Array<string>} leftItems - List of features for the left column.
 * @param {string} rightTitle - Title for the right column.
 * @param {Array<string>} rightItems - List of features for the right column.
 */
function addComparisonBlock(containerId, leftTitle, leftItems, rightTitle, rightItems) {
	const container = document.getElementById(containerId);

	if (!container) {
		console.error(`Container with ID '${containerId}' not found.`);
		return;
	}

	// Xóa toàn bộ nội dung cũ
	container.innerHTML = '';
	
	// Cập nhật các class của container
	container.classList.remove('flex', 'flex-col', 'gap-8', 'rounded-xl', 'shadow-2xl', 'p-8', 'bg-white', 'mt-8', 'border', 'border-gray-100');
	container.classList.add('mt-8');

	// --- 1. Tạo khối so sánh chính (Chevrons và Nội dung) ---
	const comparisonBlock = document.createElement('div');
	// Thêm 'gap-6' để tạo khoảng cách giữa 2 cột (trái và phải)
	comparisonBlock.className = 'grid grid-cols-1 sm:grid-cols-2 gap-6'; 

	// --- HÀM HỖ TRỢ: Tạo một cột Phase (Chevron và Nội dung) ---
	const createColumn = (title, items, bgColor, titleBgColor, isRight) => {
		const phaseDiv = document.createElement('div');
		// Thêm 'rounded-xl shadow-lg' cho mỗi khối để tạo sự tách biệt
		phaseDiv.className = 'flex flex-col h-full rounded-xl shadow-xl overflow-hidden';

		// Title Block
		const titleBlock = document.createElement('div');
		// Dùng text-gray-800 cho chữ để tăng độ tương phản trên nền sáng
		titleBlock.className = `relative p-5 font-bold text-xl sm:text-2xl ${titleBgColor} flex items-center justify-center text-center text-gray-800`;
		
		// Loại bỏ logic fix dính liền (margin, z-index)
		titleBlock.style.marginLeft = ''; 
		titleBlock.style.zIndex = 5; // Đưa về z-index mặc định
		
		// Áp dụng clip-path (Giữ nguyên hình chữ nhật vì không dùng hiệu ứng chevron)
		titleBlock.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'; 

		titleBlock.textContent = title;
		titleBlock.style.minHeight = '80px';
		
		// Content List
		const contentList = document.createElement('ul');
		// Dùng list-disc và padding-left để dấu chấm hiển thị rõ
		contentList.className = `p-8 space-y-3 ${bgColor} h-full text-gray-700 list-disc pl-10`; 

		items.forEach(item => {
			const listItem = document.createElement('li');
			listItem.textContent = item;
			contentList.appendChild(listItem);
		});

		phaseDiv.appendChild(titleBlock);
		phaseDiv.appendChild(contentList);
		return phaseDiv;
	};

	// Left Column (Waterfall) - Màu Xám Xanh nhẹ
	const leftColumn = createColumn(
		leftTitle, 
		leftItems, 
		'bg-blue-gray-50', // Nền siêu nhạt (có thể dùng bg-gray-50)
		'bg-blue-gray-200', // Tiêu đề Xám Xanh nhạt
		false
	);
	comparisonBlock.appendChild(leftColumn);

	// Right Column (Agile) - Màu Vàng Nhạt
	const rightColumn = createColumn(
		rightTitle, 
		rightItems, 
		'bg-amber-50', // Nền siêu nhạt
		'bg-amber-200', // Tiêu đề Vàng nhạt
		true
	);
	comparisonBlock.appendChild(rightColumn);

	container.appendChild(comparisonBlock);
}



 /**
 * Function to create stacked software tier blocks with connecting lines,
 * based on the provided image style (Marvell Software Tiers).
 * NOTE: Signature adjusted to accept Comparison Block data structure for flexibility.
 * @param {string} containerId - The ID of the target HTML element.
 * @param {string} tier1Title - Title for the first tier (simulating leftTitle).
 * @param {Array<string>} tier1Items - List of features for the first tier (simulating leftItems).
 * @param {string} tier2Title - Title for the second tier (simulating rightTitle).
 * @param {Array<string>} tier2Items - List of features for the second tier (simulating rightItems).
 */
function addTierBlock(containerId, tier1Title, tier1Items, tier2Title, tier2Items) {
	const container = document.getElementById(containerId);

	if (!container) {
		console.error(`Container with ID '${containerId}' not found.`);
		return;
	}

	// Map the two-column input format into the tiersData structure (assuming 2 tiers)
	// Cập nhật màu nhẹ nhàng hơn theo yêu cầu
	const tiersData = [
		{
			title: tier1Title,
			items: tier1Items,
			color: "bg-blue-300" // Xanh dương nhạt (thay cho Indigo-600)
		},
		{
			title: tier2Title,
			items: tier2Items,
			color: "bg-teal-300" // Xanh ngọc nhạt (thay cho Green-600)
		}
	];

	container.innerHTML = '';
	// Thay đổi kích thước tối đa để phù hợp với bố cục xếp chồng
	container.classList.remove('max-w-4xl', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-6'); 
	container.classList.add('mt-8', 'p-4', 'w-full', 'max-w-xl', 'mx-auto', 'space-y-6');

	// Tiêu đề cho khối Tier Block
	// const mainHeader = document.createElement('h2');
	// mainHeader.className = 'text-2xl font-bold text-gray-800 text-center mb-6';
	// mainHeader.textContent = 'Cấu Trúc Phân Tầng: So sánh 2 Khía cạnh';
	// container.appendChild(mainHeader);


	tiersData.forEach((tier, index) => {
		const tierDiv = document.createElement('div');
		// Thêm shadow để làm nổi bật từng tầng
		tierDiv.className = 'relative flex flex-col border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg';
		
		// Title Block (Giống như trong hình ảnh: nền màu, chữ trắng)
		const titleBlock = document.createElement('div');
		// Sử dụng màu từ dữ liệu. Thay đổi màu chữ từ trắng (text-white) sang xám đậm (text-gray-800) để nổi bật trên nền nhạt hơn
		const colorClass = tier.color || 'bg-gray-gray-500'; 
		titleBlock.className = `p-4 font-bold text-lg text-gray-800 ${colorClass} text-center`;
		titleBlock.textContent = tier.title;
		
		// Content List
		const contentList = document.createElement('ul');
		// List-disc for standard bullets, p-4 for padding
		contentList.className = 'p-4 space-y-2 text-gray-700 list-disc pl-8 bg-white'; 

		tier.items.forEach(item => {
			const listItem = document.createElement('li');
			listItem.textContent = item;
			contentList.appendChild(listItem);
		});

		tierDiv.appendChild(titleBlock);
		tierDiv.appendChild(contentList);
		container.appendChild(tierDiv);

		// Thêm đường nối giữa các tầng (Connecting line between tiers)
		if (index < tiersData.length - 1) {
			const connector = document.createElement('div');
			// Thiết kế một mũi tên chỉ xuống để phân tách rõ ràng
			connector.className = 'flex justify-center -mt-2 -mb-2 z-10';
			// Giữ nguyên màu mũi tên để có điểm nhấn
			connector.innerHTML = `
				<svg class="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
				</svg>
			`;
			container.appendChild(connector);
		}
	});
}


/**
 * Function to create a simple, clean timeline agenda layout.
 * @param {string} containerId - The ID of the target HTML element.
 * @param {Array<string>} agendaItems - List of agenda items.
 * @param {string} title - Main title for the agenda slide.
 */
function addTimelineAgenda(containerId, agendaItems, title) {
	const container = document.getElementById(containerId);

	if (!container) {
		console.error(`Container with ID '${containerId}' not found.`);
		return;
	}

	container.innerHTML = '';
	// Thiết lập lại container cho bố cục timeline
	container.classList.remove('max-w-xl', 'mx-auto', 'space-y-6', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-6', 'p-4'); 
	container.classList.add('mt-8', 'w-full', 'max-w-2xl', 'mx-auto', 'p-6');

	// 1. Tiêu đề Chính
	const mainHeader = document.createElement('h2');
	// Đổi màu border từ indigo-500 sang teal-500
	mainHeader.className = 'text-3xl font-extrabold text-gray-800 text-center mb-10 border-b-4 border-teal-500 pb-3';
	mainHeader.textContent = title;
	container.appendChild(mainHeader);

	// 2. Vùng Timeline
	const timelineDiv = document.createElement('div');
	timelineDiv.className = 'relative pl-8'; // Padding left for the content

	// 3. Đường thẳng Timeline (Vertical line)
	const verticalLine = document.createElement('div');
	// Đổi màu line từ indigo-200 sang teal-200
	verticalLine.className = 'absolute top-0 left-0 w-1 bg-teal-200 h-full rounded-full';
	timelineDiv.appendChild(verticalLine);

	agendaItems.forEach((item, index) => {
		const itemDiv = document.createElement('div');
		itemDiv.className = 'relative mb-10';

		// --- Vòng tròn đánh dấu (Bullet Point) ---
		const marker = document.createElement('div');
		// Đẩy marker sang trái để nằm trên đường thẳng
		marker.className = 'absolute -left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md';
		
		// Đánh dấu mục hiện tại (ví dụ: mục đầu tiên)
		const isCurrent = index === 0;
		
		// Đổi màu marker từ indigo-XXX sang teal-XXX
		marker.classList.add(isCurrent ? 'bg-teal-600' : 'bg-white', isCurrent ? 'text-white' : 'text-teal-600', 'border-4', isCurrent ? 'border-teal-500' : 'border-teal-400', 'font-bold');
		
		// Số thứ tự
		marker.textContent = index + 1;

		// --- Nội dung mục ---
		const contentBlock = document.createElement('div');
		// Đổi màu border-left từ indigo-500 sang teal-500
		contentBlock.className = 'ml-4 p-4 bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-2px] border-l-4 border-teal-500';
		
		// Tiêu đề/Mô tả mục
		const itemText = document.createElement('p');
		itemText.className = 'text-lg font-semibold text-gray-800';
		itemText.textContent = item;
		
		contentBlock.appendChild(itemText);
		itemDiv.appendChild(marker);
		itemDiv.appendChild(contentBlock);
		timelineDiv.appendChild(itemDiv);
	});

	container.appendChild(timelineDiv);
}


 /**
 * Function to create a simple, clean section header/transition slide.
 * @param {string} containerId - The ID of the target HTML element.
 * @param {string} sectionNumber - The number of the section (e.g., '01').
 * @param {string} sectionTitle - The title of the section (e.g., 'Tổng quan Dự án và Mục tiêu').
 * @param {string} [sectionNote='Chúng ta sẽ đi sâu vào phạm vi và mục đích cốt lõi của dự án.'] - Optional subtitle/note for the section.
 */
function addSectionHeader(containerId, sectionNumber, sectionTitle, sectionNote) {
	const container = document.getElementById(containerId);

	if (!container) {
		console.error(`Container with ID '${containerId}' not found.`);
		return;
	}

	container.innerHTML = '';
	// Reset container classes, set max-w-2xl (Narrower, focused container)
	container.classList.remove('max-w-5xl', 'max-w-xl');
	container.classList.add('mt-20', 'w-full', 'max-w-2xl', 'mx-auto', 'p-6');

	// --- Main Content Block ---
	const contentDiv = document.createElement('div');
	// Centered, large, rounded block with shadow
	contentDiv.className = 'bg-white p-10 rounded-xl shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden';

	// 1. Large, subtle Section Number (Background element)
	const numberDiv = document.createElement('div');
	// Absolute position, large font, light teal, subtle shadow
	numberDiv.className = 'absolute top-0 right-0 text-[10rem] sm:text-[15rem] font-extrabold text-teal-100 opacity-70 leading-none pointer-events-none transform translate-x-1/4 -translate-y-1/4';
	numberDiv.textContent = sectionNumber;
	
	// 2. Main Title (Foreground element)
	const titleElement = document.createElement('h2');
	// Bold, large text, slightly elevated z-index
	titleElement.className = 'text-4xl sm:text-5xl font-extrabold text-gray-800 relative z-10 mb-4';
	titleElement.textContent = sectionTitle;

	// 3. Teal Separator Line
	const separator = document.createElement('div');
	separator.className = 'w-24 h-1 bg-teal-500 rounded-full mb-4 relative z-10';

	// 4. Subtitle/Context (optional, now uses passed parameter)
	
	// Sử dụng ghi chú truyền vào, nếu rỗng hoặc null, dùng ghi chú mặc định.
	const finalNote = sectionNote  

	const subTitle = document.createElement('p');
	subTitle.className = 'text-lg text-gray-600 relative z-10';
	subTitle.textContent = finalNote;
	
	contentDiv.appendChild(numberDiv);
	contentDiv.appendChild(separator);
	contentDiv.appendChild(titleElement);
	contentDiv.appendChild(subTitle);
	
	container.appendChild(contentDiv);
}