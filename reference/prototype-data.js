/* BELLA CELLA — nguồn sự thật duy nhất cho nội dung sản phẩm.
   Mọi chữ ở đây trích nguyên văn từ Catalogue_BELLA_CELLA_VN.pdf.
   COMMERCE_ENABLED=false -> nút hành động hiển thị "Nhận tư vấn".
   Bật true -> hiển thị "Thêm vào giỏ" và mở giỏ hàng. */
const COMMERCE_ENABLED = false;

const BRAND = {
  name: 'BELLA CELLA',
  tagline_en: 'Beautiful From Every Cell',
  tagline_vi: 'Đẹp từ từng tế bào.',
  descriptor: 'CELL SOLUTION TECHNOLOGY',
  phone: '+84 93-445-4426',
  phoneHref: '+84934454426',
  site: 'ljlbeauty.vn'
};

const STEPS = [
  { n: 1, label: 'Làm sạch',        slug: 'bubble-clear-cleanser' },
  { n: 2, label: 'Cân bằng',        slug: 'toner-pad' },
  { n: 3, label: 'Tinh chất',       slug: 'exo-bio-ampoule' },
  { n: 4, label: 'Cấp ẩm tức thì',  slug: 'exo-bio-ampoule-mist' },
  { n: 5, label: 'Mặt nạ định kỳ',  slug: 'nmn-serum-mask' },
  { n: 6, label: 'Khóa ẩm',         slug: 'recella-cream' },
  { n: 7, label: 'Phục hồi & nền',  slug: 'recovery-bb-cushion' },
  { n: 8, label: 'Chống nắng',      slug: 'sun-cushion' }
];

const PRODUCTS = [
  {
    id: 'BC-01', sku: 'BC-CLEANSER-200', slug: 'bubble-clear-cleanser', inStock: true,
    name: 'BUBBLE CLEAR CLEANSER',
    vi: 'Sữa rửa mặt tạo bọt làm sạch dịu nhẹ',
    size: '200ml', price: 800000, priceUnit: '',
    group: 'Làm sạch', badge: null, needsReview: null,
    actives: 'Chiết xuất hạt bưởi (Citrus Grandis Seed), Artemisia Princeps, chiết xuất lá trà (Camellia Sinensis).',
    activeList: null,
    body: ['Sữa rửa mặt tạo bọt dịu nhẹ có nguồn gốc từ các thành phần thiên nhiên, giúp làm sạch hiệu quả bụi bẩn và tạp chất, đồng thời duy trì độ ẩm tự nhiên cho da mà không gây cảm giác khô căng sau khi rửa.']
  },
  {
    id: 'BC-02', sku: 'BC-TONERPAD-200', slug: 'toner-pad', inStock: true,
    name: 'TONER PAD',
    vi: 'Miếng bông dưỡng da đa năng',
    size: '200ml', price: 1100000, priceUnit: '',
    group: 'Cân bằng', badge: null,
    needsReview: 'Catalogue ghi 200ml, nhãn trên hũ ghi 180ml / 70EA — chờ xác nhận.',
    actives: 'Chiết xuất hạt bưởi (Citrus Grandis Seed), chiết xuất rau má (Asiatic Pennywort), 3 loại Amino Acid.',
    activeList: null,
    body: ['Với dưỡng chất từ chiết xuất thực vật, sản phẩm giúp cấp ẩm, cân bằng độ pH và mang lại làn da tươi mới, khỏe mạnh, căng mịn đầy sức sống.']
  },
  {
    id: 'BC-03', sku: 'BC-AMPOULE-5X10', slug: 'exo-bio-ampoule', inStock: true,
    name: 'EXO-BIO AMPOULE',
    vi: 'Tinh chất Exo-Bio Ampoule',
    size: '5ml × 10 lọ', price: 7000000, priceUnit: '/ Hộp',
    group: 'Tinh chất', badge: null, needsReview: null,
    actives: null,
    activeList: ['6 loại Exosome có nguồn gốc từ tế bào gốc thực vật', '7 loại Collagen', '15 loại Peptide', '8 loại Hyaluronic Acid'],
    body: ['Tinh chất chuyên sâu dành cho cả liệu trình chuyên nghiệp và chăm sóc tại nhà, chứa 20% Exosome thực vật, giúp tăng cường năng lượng cho làn da, cải thiện độ săn chắc và hỗ trợ làm chậm các dấu hiệu lão hóa.']
  },
  {
    id: 'BC-04', sku: 'BC-NMNMASK-10', slug: 'nmn-serum-mask', inStock: true,
    name: 'DR.BECELL NMN SERUM MASK',
    vi: 'Mặt nạ tinh chất NMN Dr.Becell',
    size: '25ml × 10 miếng/hộp', price: 1100000, priceUnit: '',
    group: 'Mặt nạ', badge: null, needsReview: null,
    actives: 'NMN (Nicotinamide Mononucleotide) cùng các hoạt chất dưỡng ẩm và phục hồi.',
    activeList: null,
    body: ['Mặt nạ serum cao cấp giúp cấp ẩm chuyên sâu, hỗ trợ phục hồi hàng rào bảo vệ da và cải thiện độ đàn hồi. Công thức giàu dưỡng chất giúp làn da trở nên mềm mại, căng bóng và rạng rỡ, đặc biệt phù hợp với làn da khô, xỉn màu hoặc sau các liệu trình chăm sóc chuyên sâu.']
  },
  {
    id: 'BC-05', sku: 'BC-SUNCUSHION', slug: 'sun-cushion', inStock: true,
    name: 'SUN CUSHION SPF50+ PA++++',
    vi: 'Phấn nước chống nắng SPF50+ PA++++',
    size: '200ml', price: 900000, priceUnit: '',
    group: 'Chống nắng', badge: null,
    needsReview: 'Catalogue ghi 200ml cho dạng phấn nước — bất thường, chờ xác nhận.',
    actives: 'Lô hội, rau má và hỗn hợp thảo mộc thiên nhiên.',
    activeList: null,
    body: ['Phấn nước chống nắng khoáng giúp bảo vệ da trước tia UV, mang lại lớp nền mỏng nhẹ, tự nhiên, đồng thời làm dịu và cấp ẩm cho da nhờ các thành phần làm mát.',
           'Sản phẩm đạt chứng nhận an toàn của Hàn Quốc, dịu nhẹ và phù hợp với cả làn da trẻ em.']
  },
  {
    id: 'BC-06', sku: 'BC-BBCUSHION-15', slug: 'recovery-bb-cushion', inStock: true,
    name: 'RECOVERY BB CUSHION',
    vi: 'Phấn nước phục hồi Recovery BB Cushion',
    size: '15g', price: 1200000, priceUnit: '',
    group: 'Phục hồi', badge: 'BEST SELLER', needsReview: null,
    actives: null, activeList: null,
    body: ['Chứa phức hợp độc quyền BELLA CELLA gồm Exosome từ tế bào gốc thực vật, 8 loại dưỡng chất quý chiết xuất từ thực vật và 7 loại Peptide.',
           'Sản phẩm dùng cho make-up giúp che phủ tự nhiên, hỗ trợ tăng cường hàng rào bảo vệ da, nuôi dưỡng làn da khỏe mạnh và mang đến hiệu ứng rạng rỡ tươi trẻ.',
           'Công thức đặc biệt có thể sử dụng như một lớp kem dưỡng phục hồi sau các liệu trình thẩm mỹ. Sản phẩm có thể lưu lại trên da qua đêm mà không cần rửa mặt, giúp nuôi dưỡng và hỗ trợ quá trình tái tạo làn da.']
  },
  {
    id: 'BC-07', sku: 'BC-MIST-50', slug: 'exo-bio-ampoule-mist', inStock: true,
    name: 'EXO-BIO AMPOULE MIST',
    vi: 'Xịt dưỡng Exo-Bio Ampoule Mist',
    size: '50ml', price: 650000, priceUnit: '',
    group: 'Cấp ẩm', badge: null, needsReview: null,
    actives: null,
    activeList: ['2 loại Exosome có nguồn gốc từ thực vật', '8 loại Hyaluronic Acid'],
    body: ['Xịt dưỡng cung cấp độ ẩm và dưỡng chất tức thì, giúp làn da luôn tươi mát, căng mọng. Công thức chứa Exosome thực vật kết hợp 8 loại Hyaluronic Acid cùng nguyên liệu độc quyền của BELLA CELLA giúp nuôi dưỡng làn da khỏe mạnh mỗi ngày.']
  },
  {
    id: 'BC-08', sku: 'BC-RECELLA-30', slug: 'recella-cream', inStock: true,
    name: 'RECELLA CREAM',
    vi: 'Kem dưỡng ReCella Cream',
    size: '24ml × 30 gói', price: 600000, priceUnit: '/ Hộp',
    group: 'Dưỡng', badge: null, needsReview: null,
    actives: null,
    activeList: ['Dầu Babassu: 50.000 ppm'],
    body: ['Kem dưỡng ngày và đêm chứa 14 loại chiết xuất thực vật, giúp nuôi dưỡng chuyên sâu, củng cố hàng rào bảo vệ độ ẩm tự nhiên và duy trì làn da mềm mại, khỏe mạnh.',
           'Sản phẩm được đóng gói theo từng liều sử dụng, đảm bảo vệ sinh, thuận tiện khi sử dụng & dễ dàng mang theo mọi lúc, mọi nơi.']
  }
];

const CREDENTIALS = {
  heading: 'ĐỒNG HÀNH CÙNG CÁC CHUYÊN GIA CHĂM SÓC DA TẠI HÀN QUỐC VÀ NHẬT BẢN',
  body: 'BELLA CELLA tự hào mang đến những giải pháp chăm sóc da chuyên nghiệp, được nhiều spa và chuyên gia làm đẹp tại Hàn Quốc và Nhật Bản tin tưởng lựa chọn. Thương hiệu đồng thời được giới thiệu trên các tạp chí làm đẹp tại Nhật Bản, góp phần lan tỏa triết lý chăm sóc da từ tế bào đến đông đảo khách hàng.',
  photos: [
    { img: 'cred-treatment',  cap: 'Chuyên gia Nhật Bản trực tiếp thực hiện liệu trình chăm sóc da với BELLA CELLA.' },
    { img: 'cred-fukuoka-a',  cap: 'Không gian giới thiệu thương hiệu BELLA CELLA tại Fukuoka, Nhật Bản.' },
    { img: 'cred-fukuoka-b',  cap: 'Không gian giới thiệu thương hiệu BELLA CELLA tại Fukuoka, Nhật Bản.' },
    { img: 'cred-seminar',    cap: 'Chuyên gia BELLA CELLA tham gia chia sẻ chuyên môn tại hội thảo của Viện Nghiên cứu K-Beauty, Hàn Quốc.' },
    { img: 'cred-press',      cap: 'BELLA CELLA được đăng tải trên các ấn phẩm làm đẹp tại Nhật Bản.' }
  ]
};

/* ---------------------------------------------------------------
   HƯỚNG DẪN SỬ DỤNG
   usageSource: 'general' = hướng dẫn chung theo LOẠI sản phẩm, không
   phải văn bản chính thức của BELLA CELLA. Cần thay bằng hướng dẫn
   chính thức khi nhà sản xuất cung cấp.
   --------------------------------------------------------------- */
const USAGE = {
  'bubble-clear-cleanser': { usageSource:'general', when:'Sáng và tối', steps:[
    'Làm ướt mặt bằng nước ấm.','Nhấn 1–2 lần lấy bọt ra lòng bàn tay.',
    'Massage nhẹ theo vòng tròn 30–60 giây, tránh vùng mắt.','Rửa lại bằng nước sạch, thấm khô bằng khăn mềm.'] },
  'toner-pad': { usageSource:'general', when:'Sau bước làm sạch', steps:[
    'Dùng kẹp gắp lấy một miếng, tránh đưa tay vào hũ.','Lau nhẹ khắp mặt theo hướng từ trong ra ngoài.',
    'Có thể đắp tại vùng cần cấp ẩm 3–5 phút.','Không cần rửa lại.'] },
  'exo-bio-ampoule': { usageSource:'general', when:'Tối, theo liệu trình', steps:[
    'Lắc nhẹ lọ trước khi mở.','Dùng hết một lọ cho mỗi lần sử dụng.',
    'Vỗ nhẹ cho thấm, không chà xát.','Chờ thấm rồi mới dùng bước dưỡng tiếp theo.'] },
  'nmn-serum-mask': { usageSource:'general', when:'2–3 lần mỗi tuần', steps:[
    'Dùng sau bước làm sạch và cân bằng.','Đắp mặt nạ 15–20 phút.',
    'Tháo mặt nạ, vỗ nhẹ phần tinh chất còn lại cho thấm.','Không rửa lại, tiếp tục bước dưỡng.'] },
  'sun-cushion': { usageSource:'general', when:'Buổi sáng, bước cuối', steps:[
    'Dùng sau khi đã hoàn tất các bước dưỡng.','Ấn nhẹ bông phấn vào lõi, dặm đều từ giữa mặt ra ngoài.',
    'Dặm lại sau mỗi 2–3 giờ nếu ở ngoài trời.','Tẩy trang kỹ vào cuối ngày.'] },
  'recovery-bb-cushion': { usageSource:'general', when:'Ban ngày hoặc qua đêm', steps:[
    'Ban ngày: dặm như lớp nền sau bước dưỡng.','Sau liệu trình thẩm mỹ: dặm một lớp mỏng như kem dưỡng phục hồi.',
    'Theo catalogue, sản phẩm có thể lưu trên da qua đêm mà không cần rửa mặt.','Vệ sinh bông phấn thường xuyên.'] },
  'exo-bio-ampoule-mist': { usageSource:'general', when:'Bất cứ khi nào da cần ẩm', steps:[
    'Lắc nhẹ, giữ cách mặt 15–20cm.','Xịt đều 2–3 nhịp.',
    'Vỗ nhẹ cho thấm thay vì để tự khô.','Dùng được trên lớp trang điểm.'] },
  'recella-cream': { usageSource:'general', when:'Sáng và tối, bước dưỡng', steps:[
    'Xé một gói, dùng hết trong một lần.','Thoa đều khắp mặt và cổ.',
    'Vỗ nhẹ theo hướng đi lên.','Dùng trước bước chống nắng vào buổi sáng.'] }
};

/* ---------------------------------------------------------------
   KIẾN THỨC THÀNH PHẦN — trình bày trung thực theo bằng chứng hiện có
   --------------------------------------------------------------- */
const KNOWLEDGE = [
  { key:'exosome', title:'Exosome từ tế bào gốc thực vật', eyebrow:'Hoạt chất trung tâm',
    body:[
      'Exosome là các túi nhỏ do tế bào tiết ra, mang theo protein, lipid và phân tử tín hiệu. Loại dùng trong mỹ phẩm thực vật thường được gọi chính xác hơn là "túi giống exosome có nguồn gốc thực vật" (plant-derived exosome-like nanovesicles), chiết từ tế bào gốc thực vật.',
      'Trong dòng BELLA CELLA, Exo-Bio Ampoule chứa 6 loại Exosome và 20% Exosome thực vật theo catalogue; Exo-Bio Ampoule Mist chứa 2 loại; Recovery BB Cushion dùng phức hợp độc quyền của thương hiệu.'],
    evidence:[
      'Một tổng quan hệ thống năm 2026 trên 19 nghiên cứu ở người ghi nhận mối liên hệ giữa exosome bôi ngoài với cải thiện ngắn hạn về độ ẩm, độ đàn hồi, nếp nhăn, lỗ chân lông, sắc tố và vẻ ngoài tổng thể.',
      'Phần lớn các nghiên cứu đó không ngẫu nhiên hóa và mang tính quan sát, phương pháp khác nhau nhiều, thời gian theo dõi ngắn, chưa có dữ liệu an toàn dài hạn.',
      'Riêng việc dùng bôi ngoài sau thủ thuật cho thấy mức an toàn ngắn hạn thuận lợi — đúng bối cảnh sử dụng của dòng sản phẩm này.',
      'FDA cho biết hiện chưa có sản phẩm exosome nào được FDA phê duyệt. Các phát ngôn tiếp thị trong ngành nhìn chung đang đi trước dữ liệu.'],
    sources:[{t:'Exosomes for skin: what the evidence actually shows (2026)', u:'https://dermatologynews.net/articles/exosome-skin-rejuvenation-evidence-2026/'},
             {t:'Plant-Derived Exosomes in Aesthetic Medicine, Biomaterials Research', u:'https://spj.science.org/doi/10.34133/bmr.0397'},
             {t:'Clinical Evidence and Commercial Landscape of Topical Exosomes: A Scoping Review', u:'https://pubmed.ncbi.nlm.nih.gov/42411735/'}] },
  { key:'nmn', title:'NMN — Nicotinamide Mononucleotide', eyebrow:'Dòng Dr.Becell',
    body:[
      'NMN là tiền chất của NAD+, một coenzyme tham gia chuyển hóa năng lượng trong tế bào. Nồng độ NAD+ trong da giảm dần theo tuổi, nên NMN được quan tâm như hướng tiếp cận chống lão hóa.',
      'Trong dòng BELLA CELLA, NMN xuất hiện ở Toner Pad và Dr.Becell NMN Serum Mask.'],
    evidence:[
      'Nghiên cứu tiền lâm sàng trên chuột cho thấy β-NMN giúp tăng cường chức năng hàng rào bảo vệ da và làm giảm lão hóa do tia UV-B.',
      'Có nghiên cứu in vitro cho thấy NMN làm giảm sản xuất melanin ở tế bào melanocyte đã lão hóa.',
      'Dữ liệu trên người với NMN dùng bôi ngoài còn hạn chế. Nên xem đây là hướng nghiên cứu có triển vọng, chưa phải hiệu quả đã được chứng minh trên người.'],
    sources:[{t:'β-NMN Enhances Skin Barrier Function and Attenuates UV-B-Induced Photoaging in Mice', u:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12729516/'},
             {t:'NMN reduces melanin production in aged melanocytes (J Dermatol Sci)', u:'https://www.sciencedirect.com/science/article/abs/pii/S0923181122001220'}] },
  { key:'botanical', title:'Nhóm thành phần thực vật', eyebrow:'Thành phần hỗ trợ',
    body:[
      'Rau má (Centella asiatica / Asiatic Pennywort) — có trong Toner Pad và Sun Cushion. Đây là thành phần lâu năm trong chăm sóc da phục hồi, thường dùng cho da sau thủ thuật và da nhạy cảm.',
      'Chiết xuất hạt bưởi (Citrus Grandis Seed) — có trong Bubble Clear Cleanser và Toner Pad. Lá trà (Camellia Sinensis) và Artemisia Princeps cũng xuất hiện trong sản phẩm làm sạch.',
      'Dầu Babassu ở nồng độ 50.000 ppm trong Recella Cream. Đây là dầu chiết từ hạt cọ Babassu, thuộc nhóm dầu khóa ẩm.'],
    evidence:[
      'Các thành phần trên là nguyên liệu mỹ phẩm phổ thông, được sử dụng rộng rãi. Nồng độ và công thức cụ thể quyết định hiệu quả thực tế, và catalogue không công bố toàn bộ bảng thành phần (INCI).',
      'Nếu bạn có tiền sử dị ứng, hãy xem bảng thành phần đầy đủ in trên bao bì trước khi dùng.'],
    sources:[] },
  { key:'ha', title:'Hyaluronic Acid, Collagen và Peptide', eyebrow:'Nhóm cấp ẩm và nâng đỡ',
    body:[
      'Exo-Bio Ampoule kết hợp 7 loại Collagen, 15 loại Peptide và 8 loại Hyaluronic Acid. Exo-Bio Ampoule Mist chứa 8 loại Hyaluronic Acid. Recovery BB Cushion bổ sung 7 loại Peptide.',
      'Việc dùng nhiều phân tử lượng Hyaluronic Acid khác nhau là cách phổ biến để cấp ẩm ở các độ sâu khác nhau của lớp sừng.'],
    evidence:[
      'Hyaluronic Acid bôi ngoài có bằng chứng tốt và lâu năm cho tác dụng cấp ẩm và cải thiện độ đàn hồi bề mặt.',
      'Peptide là nhóm rất rộng, hiệu quả phụ thuộc vào từng chuỗi peptide cụ thể. Catalogue không nêu tên từng loại nên không thể đánh giá chi tiết hơn.',
      'Collagen bôi ngoài có phân tử lớn, tác dụng chủ yếu là dưỡng ẩm bề mặt chứ không thay thế collagen trong lớp bì.'],
    sources:[] }
];

const FAQ = [
  { q:'Exosome là gì và có thật sự hiệu quả không?',
    a:'Exosome là túi nhỏ mang phân tử tín hiệu do tế bào tiết ra. Tổng quan hệ thống năm 2026 trên 19 nghiên cứu ở người ghi nhận cải thiện ngắn hạn về độ ẩm, độ đàn hồi và nếp nhăn, nhưng phần lớn nghiên cứu không ngẫu nhiên hóa và chưa có dữ liệu dài hạn. Hiện chưa có sản phẩm exosome nào được FDA phê duyệt. Nói ngắn: tín hiệu ban đầu tích cực, chưa phải kết luận chắc chắn.' },
  { q:'Dùng được ngay sau khi laser hoặc lăn kim không?',
    a:'Phải theo chỉ định của bác sĩ hoặc chuyên gia đang điều trị cho bạn. Catalogue định vị dòng này là chăm sóc tại nhà sau liệu trình, và nghiên cứu cho thấy exosome bôi ngoài sau thủ thuật có mức an toàn ngắn hạn thuận lợi. Nhưng thời điểm bắt đầu dùng sau mỗi thủ thuật là khác nhau — chúng tôi không tự đưa ra chỉ định thay cho người điều trị.' },
  { q:'Thứ tự dùng tám sản phẩm như thế nào?',
    a:'Làm sạch, cân bằng, tinh chất, cấp ẩm, mặt nạ định kỳ, khóa ẩm, phục hồi, chống nắng. Xem chi tiết ở trang Liệu trình. Đây là thứ tự chăm sóc thông thường, không phải chỉ định y khoa.' },
  { q:'Da nhạy cảm hoặc da mụn dùng được không?',
    a:'Catalogue ghi Sun Cushion đạt chứng nhận an toàn của Hàn Quốc, dịu nhẹ và phù hợp với cả làn da trẻ em. Với các sản phẩm còn lại, catalogue không nêu riêng cho da nhạy cảm — nên thử một vùng nhỏ trước và đọc bảng thành phần trên bao bì nếu bạn có tiền sử dị ứng.' },
  { q:'NMN trong Toner Pad và Serum Mask có tác dụng gì?',
    a:'NMN là tiền chất của NAD+. Nghiên cứu tiền lâm sàng trên chuột cho thấy giúp tăng cường hàng rào bảo vệ da và giảm lão hóa do tia UV-B. Dữ liệu trên người với dạng bôi ngoài còn hạn chế.' },
  { q:'Bao lâu thì thấy kết quả?',
    a:'Catalogue không công bố số liệu thời gian cho dòng sản phẩm này, nên chúng tôi không đưa ra con số. Các nghiên cứu về exosome bôi ngoài nói chung theo dõi trong vài tuần và ghi nhận thay đổi ngắn hạn. Kết quả thực tế phụ thuộc tình trạng da và liệu trình bạn đang thực hiện.' },
  { q:'Giá trên website có phải giá cuối không?',
    a:'Giá hiển thị là giá niêm yết theo catalogue chính thức. Giá có thể thay đổi theo thời điểm và chương trình. Liên hệ để xác nhận trước khi đặt.' },
  { q:'Website này có phải trang chính thức của BELLA CELLA?',
    a:'Không. Đây là website của đại lý phân phối tại Việt Nam. Nội dung sản phẩm trích từ catalogue chính thức do nhà sản xuất cung cấp. Thông tin thương hiệu gốc thuộc về BELLA CELLA.' },
  { q:'Có mua hàng trực tuyến được không?',
    a:'Hiện chưa. Website đang ở giai đoạn cung cấp thông tin. Để đặt hàng, gọi điện hoặc chat Zalo qua số ở cuối trang.' }
];
