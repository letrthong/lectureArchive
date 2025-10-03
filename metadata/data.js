  var MOCK_SLIDE_DATA = [
        {
            "id": "mock-001x",
            "page": 1,
            "template": "9",
            "title": "Bài Giảng Về Toán Học",
            "detail":  "$$x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}$$",
            "notes": " https://nongphu.vn @ 2025",
            "referenceImagesBase64": ""
        },
        {
            "id": "mock-008xx",
            "page": 2,
            "template": "8",
            "title": " Dùng thừa số nguyên tố để tìm ƯCLN ",
            "detail": " Ước số chung lớn nhất của hai hay nhiều số là số lớn nhất mà các số đều chia hết cho. Để tìm ƯCLN của hai hay nhiều số ta thực hiện",
            "content": [
                { "order": 1, "text": "Viết mỗi số dưới dạng tích các thừa số nguyên tố " },
                { "order": 2, "text": "Viết ra các thừa số nguyên tố chung của các số " },
                { "order": 3, "text": "Xác định bậc nhỏ nhất của các thừa số chung vừa chọn" },
                { "order": 4, "text": "Nhân chứng lại với nhau và viết kết quả dưới dạng số bình thường, ta được ƯCLN" }
            ],
            "notes": "Template này lý tưởng cho việc giới thiệu một tổng quan (Detail) sau đó liệt kê các bước cụ thể theo thứ tự (Content List - số thứ tự).",
            "referenceImagesBase64": "",
            "blocks": []
        },
         {
            "id": "mock-007xx",
            "page": 3,
            "template": "7",
            "title": "Ví dụ 1: Tìm ƯCLN của 24 và 60 ",
            "content": [
                { "order": 1, "text": "24= $2^3$ x3 và 60= $2^2$ x3x5" },
                { "order": 2, "text": "Thừa số nguyên tố chung là 2 và 3" },
                { "order": 3, "text": "Bậc nhỏ nhất của 2 là 2, của 3 là 1" },
                { "order": 4, "text": "Vậy, ƯCLN của 24 và 60 bằng   $2^2$ x3 = 4x3 =12" }
            ],
            "detail": "Template 7 tương tự Template 3/6 nhưng sử dụng số thứ tự tùy chỉnh, rất phù hợp để trình bày quy trình hoặc các bước tuần tự."
        },
        {
            "id": "mock-007xxy",
            "page": 4,
            "template": "7",
            "title": "Ví dụ 2: Tìm ƯCLN của 360 và 700",
            "content": [
                { "order": 1, "text": "36 = $2^3$ x$3^2$ x5 và 700= $2^2$ x$5^2$ x7" },
                { "order": 2, "text": "Thừa số nguyên tố chung là 2 và 5" },
                { "order": 3, "text": "Bậc nhỏ nhất của 2 là 2, của 5 là 1" },
                { "order": 4, "text": "Vậy, ƯCLN của 360 và 700 bằng   $2^2$ x5 = 4x5 =20" }
            ],
            "detail": "Template 7 tương tự Template 3/6 nhưng sử dụng số thứ tự tùy chỉnh, rất phù hợp để trình bày quy trình hoặc các bước tuần tự."
        },
        {
          "id": "67a9e6cb-65a7-4f73-a3a1-f57d7f3bdde5",
          "page": 5,
          "template": "10",
          "title": "Ví dụ minh họa",
          "detail": " ",
          "notes": "",
          "referenceImagesBase64":  "https://placehold.co/450x300/3B82F6/ffffff?text=EU+Delivery+Van",
          "blocks": []
        },
        {
          "id": "67a9e6cb-65a7-4f73-a3a1-f57d7f3bdde5",
          "page": 5,
          "template": "11",
          "title": "Ví dụ minh họa",
          "detail": " ",
          "notes": "xxxxxxxx",
          "imagesBase64Left":  "https://placehold.co/450x300/3B82F6/ffffff?text=EU+Delivery+Van",
           "textLeft":  "EU Region - Logistics",
           "imagesBase64Right":  "https://placehold.co/450x300/F59E0B/ffffff?text=NA+Heavy+Hauler",
           "textRight":  "NA Region - Heavy Duty",
          "blocks": []
        },
        {
            "id": "mock-001xx",
            "page": 6,
            "template": "9",
            "title": "",
            "detail":  "Cảm ơn đã theo dõi ",
            "notes": "https://telua.co/",
            "referenceImagesBase64": ""
        }

];


        // Dữ liệu mẫu (Mock data)
<!--        const MOCK_SLIDE_DATA = [-->
<!--            {-->
<!--                // SLIDE 1: Trang Bìa/Trang Kết (TEMPLATE 2 - Minimalist Cover)-->
<!--                "id": "mock-001",-->
<!--                "page": 1,-->
<!--                "template": "2", // Template 2: Trang Bìa/Trang Kết-->
<!--                "title": "PHÂN TÍCH VÀ ĐỀ XUẤT PHÁT TRIỂN KỶ NGUYÊN SỐ",-->
<!--                "detail": "BÁO CÁO CHIẾN LƯỢC NỘI BỘ Q4/2025",-->
<!--                "notes": "Tác Giả: Nhóm Dự Án A2 | Template 2", -->
<!--                "referenceImagesBase64": ""-->
<!--            },-->
<!--            {-->
<!--                // SLIDE 1: Trang Bìa/Trang Kết (TEMPLATE 2 - Minimalist Cover)-->
<!--                "id": "mock-001x",-->
<!--                "page": 1,-->
<!--                "template": "2", // Template 2: Trang Bìa/Trang Kết-->
<!--                "title": "PHÂN TÍCH VÀ ĐỀ XUẤT PHÁT TRIỂN KỶ NGUYÊN SỐ",-->
<!--                "detail": "  $x^2 = 9$   ",-->
<!--                "notes": "", -->
<!--                "referenceImagesBase64": ""-->
<!--            }, -->
<!--            {-->
<!--                // SLIDE 1: Trang Bìa/Trang Kết (TEMPLATE 2 - Minimalist Cover)-->
<!--                "id": "mock-009",-->
<!--                "page": 1,-->
<!--                "template": "9", // Template 2: Trang Bìa/Trang Kết-->
<!--                "title": "PHÂN TÍCH VÀ ĐỀ XUẤT PHÁT TRIỂN KỶ NGUYÊN SỐ",-->
<!--                "detail": "BÁO CÁO CHIẾN LƯỢC NỘI BỘ Q4/2025",-->
<!--                "notes": "Tác Giả: Nhóm Dự Án A2 |  Template 9", -->
<!--                "referenceImagesBase64": "" -->
<!--            },-->
<!--            {-->
<!--                // SLIDE 1: Trang Bìa/Trang Kết (TEMPLATE 2 - Minimalist Cover)-->
<!--                "id": "mock-209",-->
<!--                "page": 1,-->
<!--                "template": "9", // Template 2: Trang Bìa/Trang Kết-->
<!--                "title": "PHÂN TÍCH VÀ ĐỀ XUẤT PHÁT TRIỂN KỶ NGUYÊN SỐ",-->
<!--                "detail": "BÁO CÁO CHIẾN LƯỢC NỘI BỘ Q4/2025",-->
<!--                "notes": " ",-->
<!--                "referenceImagesBase64": "" -->
<!--            },-->
<!--            {-->
<!--                // SLIDE 2: Minh họa nội dung chi tiết rất dài, cần cuộn (TEMPLATE 1)-->
<!--                "id": "mock-002",-->
<!--                "page": 2,-->
<!--                "template": "1", // Template 1: Template chuẩn-->
<!--                "title": "Slide Mẫu 2 (Template 1): Kiểm tra chức năng cuộn nội dung & Blocks",-->
<!--                "detail": "Nội dung chi tiết rất dài nhằm mục đích kiểm tra CSS max-height và overflow-y: auto.\n\nKiểm tra cuộn dọc 1: Tất cả chữ cái đều theo một chuẩn font và không bị in đậm ngẫu nhiên.\n\nKiểm tra cuộn dọc 2: Chúng ta đang sử dụng font 'Inter' với độ dày (weight) tiêu chuẩn (regular/400) cho nội dung chi tiết.\n\nKiểm tra cuộn dọc 3.\n\nKiểm tra cuộn dọc 4.",-->
<!--                "referenceImagesBase64": "", -->
<!--                "notes": "Slide này có ghi chú và blocks, và tất cả sẽ được hiển thị.",-->
<!--                -->
<!--                "blocks": [-->
<!--                    {-->
<!--                        "order": 1,-->
<!--                        "notes": "Khối A: Nội dung quan trọng (Block 1)", -->
<!--                        "imageBase64": "", -->
<!--                        "content": [-->
<!--                            { "order": 1, "text": "Đây là mục 1 của Khối A." },-->
<!--                            { "order": 2, "text": "Đây là mục 2 của Khối A." }-->
<!--                        ]-->
<!--                    }-->
<!--                ]-->
<!--            },-->
<!--             {-->
<!--                // SLIDE 2: Minh họa nội dung chi tiết rất dài, cần cuộn (TEMPLATE 1)-->
<!--                "id": "mock-00xx",-->
<!--                "page": 2,-->
<!--                "template": "1", // Template 1: Template chuẩn-->
<!--                "title": "Slide Mẫu 2 (Template 1): Kiểm tra chức năng cuộn nội dung & Blocks",-->
<!--                "detail": "Nội dung chi tiết rất dài nhằm mục đích kiểm tra CSS max-height và overflow-y: auto. Kiểm tra cuộn dọc 1: Tất cả chữ cái đều theo một chuẩn font và không bị in đậm ngẫu nhiên. Kiểm tra cuộn dọc 2: Chúng ta đang sử dụng font 'Inter' với độ dày (weight) tiêu chuẩn (regular/400) cho nội dung chi tiết. Kiểm tra cuộn dọc 3.\n\nKiểm tra cuộn dọc 4.",-->
<!--                "referenceImagesBase64": "", -->
<!--                "notes": " ",-->
<!--                -->
<!--                "blocks": [-->
<!--                ]-->
<!--            },-->
<!--            {-->
<!--                // SLIDE 3: Minh họa Template 3 (Danh sách đơn giản)-->
<!--                "id": "mock-003",-->
<!--                "page": 3,-->
<!--                "template": "3", -->
<!--                "title": "BỐN ĐỘNG LỰC PHÁT TRIỂN CHÍNH TRONG NĂM 2026 (TEMPLATE 3 - Có Bullets)",-->
<!--                "content": [-->
<!--                    { "order": 1, "text": "Động lực 1: Tối ưu hóa trải nghiệm người dùng trên các nền tảng di động." },-->
<!--                    { "order": 2, "text": "Động lực 2: Mở rộng thị trường mục tiêu sang khu vực Đông Nam Á." },-->
<!--                    { "order": 3, "text": "Động lực 3: Đầu tư mạnh vào công nghệ AI để tự động hóa quy trình nội bộ." },-->
<!--                    { "order": 4, "text": "Động lực 4: Xây dựng quan hệ đối tác chiến lược với các nhà cung cấp lớn." }-->
<!--                ],-->
<!--                "detail": "Template 3 chỉ hiển thị Title và Content (danh sách 1 cột) với dấu chấm đầu dòng (bullet points)."-->
<!--            },-->
<!--            {-->
<!--                // SLIDE 4: Minh họa Template 4: Hai cột nội dung-->
<!--                "id": "mock-004",-->
<!--                "page": 4,-->
<!--                "template": "4", -->
<!--                "title": "SO SÁNH CÁC KÊNH PHÂN PHỐI SẢN PHẨM (TEMPLATE 4)",-->
<!--                "contentLeft": [-->
<!--                    { "order": 1, "text": "Kênh A: Phân phối truyền thống (Giá cao, Độ phủ thấp)." },-->
<!--                    { "order": 2, "text": "Kênh B: Thương mại điện tử (Giá trung bình, Độ phủ toàn cầu)." },-->
<!--                    { "order": 3, "text": "Kênh C: Mạng xã hội (Chi phí quảng cáo thấp, Tương tác trực tiếp)." },-->
<!--                    { "order": 4, "text": "Kênh D: Bán hàng trực tiếp (Tùy chỉnh cao, Chi phí vận hành lớn)." }-->
<!--                ],-->
<!--                "contentRight": [-->
<!--                    { "order": 1, "text": "Đối tượng A: Khách hàng lớn tuổi, thích trải nghiệm vật lý." },-->
<!--                    { "order": 2, "text": "Người trẻ, thành thị, sử dụng smartphone thường xuyên." },-->
<!--                    { "order": 3, "text": "Nhóm khách hàng tìm kiếm thông tin theo cảm xúc và xu hướng." },-->
<!--                    { "order": 4, "text": "Khách hàng doanh nghiệp (B2B) cần tư vấn chuyên sâu." }-->
<!--                ],-->
<!--                "detail": "Template 4 hiển thị Title và Content (danh sách 2 cột: contentLeft và contentRight) với dấu chấm đầu dòng."-->
<!--            },-->
<!--            {-->
<!--                // SLIDE 5: Minh họa Template 5: Chi tiết trước và Danh sách (Detail First - CÓ Bullets)-->
<!--                "id": "mock-005", -->
<!--                "page": 5, -->
<!--                "template": "5", -->
<!--                "title": "TỔNG QUAN VÀ CHI TIẾT CÁC ĐỘNG LỰC PHÁT TRIỂN (TEMPLATE 5)", -->
<!--                "detail": "Định hướng chiến lược năm 2026 tập trung vào **chuyển đổi số toàn diện** và thâm nhập các thị trường mới. Phần detail này sẽ được hiển thị ngay trên danh sách nội dung, đóng vai trò là phần giới thiệu hoặc tóm tắt ý chính.", -->
<!--                "content": [ -->
<!--                    { "order": 1, "text": "Động lực 1: Tối ưu hóa trải nghiệm người dùng trên các nền tảng di động." }, -->
<!--                    { "order": 2, "text": "Động lực 2: Mở rộng thị trường mục tiêu sang khu vực Đông Nam Á." }, -->
<!--                    { "order": 3, "text": "Động lực 3: Đầu tư mạnh vào công nghệ AI để tự động hóa quy trình nội bộ." }, -->
<!--                    { "order": 4, "text": "Động lực 4: Xây dựng quan hệ đối tác chiến lược với các nhà cung cấp lớn." } -->
<!--                ],-->
<!--                "notes": "Template 5: Title, Detail (trước) được làm nổi bật, và Content List 1 cột (có bullets).",-->
<!--                "referenceImagesBase64": "", -->
<!--                "blocks": []-->
<!--            },-->
<!--            {-->
<!--                // SLIDE 6: Minh họa Template 6: Danh sách Đơn Giản KHÔNG Bullet-->
<!--                "id": "mock-006",-->
<!--                "page": 6,-->
<!--                "template": "6", -->
<!--                "title": "MỤC TIÊU PHÁT TRIỂN TRỌNG ĐIỂM (TEMPLATE 6 - Không Bullets)",-->
<!--                "content": [-->
<!--                    { "order": 1, "text": "Tối ưu hóa Trải nghiệm người dùng di động (Mobile UX Optimization)." },-->
<!--                    { "order": 2, "text": "Mở rộng thị trường sang khu vực Đông Nam Á (SEA Market Expansion)." },-->
<!--                    { "order": 3, "text": "Tăng cường đầu tư vào công nghệ AI (AI Technology Investment)." },-->
<!--                    { "order": 4, "text": "Xây dựng quan hệ đối tác chiến lược với các nhà cung cấp lớn (Strategic Partnerships)." }-->
<!--                ],-->
<!--                "detail": "Template 6 tương tự Template 3 nhưng không sử dụng dấu chấm đầu dòng, chỉ hiển thị văn bản thuần túy với Title.",-->
<!--                "notes": "Template này phù hợp cho các danh sách ngắn gọn hoặc liệt kê các mục tiêu."-->
<!--            },-->
<!--            {-->
<!--                // SLIDE 7: Minh họa Template 7: Danh sách Đơn Giản CÓ Số Thứ Tự (Order Numbers)-->
<!--                "id": "mock-007",-->
<!--                "page": 7,-->
<!--                "template": "7", -->
<!--                "title": "BẢY BƯỚC THỰC HIỆN DỰ ÁN (TEMPLATE 7 - Số Thứ Tự)",-->
<!--                "content": [-->
<!--                    { "order": 1, "text": "Khởi tạo và Thu thập Yêu cầu (Initiation & Requirement Gathering)." },-->
<!--                    { "order": 2, "text": "Phân tích và Thiết kế Hệ thống (System Analysis & Design)." },-->
<!--                    { "order": 3, "text": "Lập trình và Phát triển (Coding & Development)." },-->
<!--                    { "order": 4, "text": "Kiểm thử (Testing) với nhóm người dùng nội bộ." },-->
<!--                    { "order": 5, "text": "Triển khai (Deployment) phiên bản Beta công khai." },-->
<!--                    { "order": 6, "text": "Đánh giá và Tối ưu (Evaluation & Optimization)." },-->
<!--                    { "order": 7, "text": "Bàn giao và Bảo trì (Handover & Maintenance)." }-->
<!--                ],-->
<!--                "detail": "Template 7 tương tự Template 3/6 nhưng sử dụng số thứ tự tùy chỉnh, rất phù hợp để trình bày quy trình hoặc các bước tuần tự."-->
<!--            },-->
<!--            {-->
<!--                // SLIDE 8: Minh họa Template 8: Chi tiết trước và Danh sách CÓ Số Thứ Tự-->
<!--                "id": "mock-008", -->
<!--                "page": 8, -->
<!--                "template": "8", // TEMPLATE 8 MỚI-->
<!--                "title": "KẾ HOẠCH HÀNH ĐỘNG CHI TIẾT THEO QUÝ (TEMPLATE 8 - Detail Nổi Bật + Số Thứ Tự)", -->
<!--                "detail": "Kế hoạch hành động này phác thảo các mục tiêu chính của chúng ta trong năm tới, tập trung vào việc đảm bảo tính minh bạch và khả năng đo lường hiệu suất. Phần detail này được làm nổi bật để tóm tắt ý chính trước khi đi vào các bước chi tiết. Đây là điểm chung với Template 5.", -->
<!--                "content": [ -->
<!--                    { "order": 1, "text": "Quý 1: Hoàn thành đợt nâng cấp hệ thống CRM lên phiên bản mới nhất." }, -->
<!--                    { "order": 2, "text": "Quý 2: Thử nghiệm A/B trên 50% landing pages chính để cải thiện tỷ lệ chuyển đổi 15%." }, -->
<!--                    { "order": 3, "text": "Quý 3: Mở rộng đội ngũ phát triển sản phẩm thêm 10 kỹ sư chuyên môn cao." }, -->
<!--                    { "order": 4, "text": "Quý 4: Ra mắt sản phẩm X tại thị trường Châu Âu và đạt được 100 khách hàng doanh nghiệp đầu tiên." } -->
<!--                ],-->
<!--                "notes": "Template này lý tưởng cho việc giới thiệu một tổng quan (Detail) sau đó liệt kê các bước cụ thể theo thứ tự (Content List - số thứ tự).",-->
<!--                "referenceImagesBase64": "", -->
<!--                "blocks": []-->
<!--            }-->
<!--        ];-->