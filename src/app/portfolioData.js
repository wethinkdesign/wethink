/* ── Portfolio Data ──
 *
 * 每個案件可包含多張圖片。
 * - cover: Grid 中顯示的封面圖（通常為 images 的第一張）
 * - images: 案件的所有圖片陣列
 *
 * 圖片路徑格式: /wethink/portfolio/<folder-name>/01.jpg
 * (因 next.config.mjs 設定 basePath: "/wethink"，所有靜態資源需加此前綴)
 *
 * 快速新增案件：執行 scripts/add-project.sh，詳見該檔案說明。
 */

const generateImages = (id, count) => {
    return Array.from({length: count}, (_, i) =>
        `/wethink/portfolio/${id}/${(i + 1).toString().padStart(2, '0')}.jpg`
    );
};

export const portfolioCategory = {
    All: "all",
    Residential: "residential",
    Commercial: "commercial",
    Office: "office"
};

const portfolioItems = [
    {
        title: "靜謐之居",
        subtitle: "Tranquil Residence",
        category: portfolioCategory.Residential,
        images: generateImages(1, 3),
    },
    {
        title: "光影咖啡",
        subtitle: "Shadow & Light Café",
        category: portfolioCategory.Commercial,
        images: generateImages(2, 2),
    },
    {
        title: "都會寓所",
        subtitle: "Urban Loft",
        category: portfolioCategory.Residential,
        images: generateImages(3, 2),
    },
    {
        title: "簡約辦公",
        subtitle: "Minimal Office",
        category: portfolioCategory.Office,
        images: generateImages(4, 2),
    },
    {
        title: "森林之家",
        subtitle: "Forest House",
        category: portfolioCategory.Residential,
        images: generateImages(5, 3),
    },
    {
        title: "禪意茶室",
        subtitle: "Zen Tea Room",
        category: portfolioCategory.Commercial,
        images: generateImages(6, 2),
    },
    {
        title: "湖畔別墅",
        subtitle: "Lakeside Villa",
        category: portfolioCategory.Residential,
        images: generateImages(7, 2),
    },
    {
        title: "藝廊空間",
        subtitle: "Art Gallery Space",
        category: portfolioCategory.Commercial,
        images: generateImages(8, 2),
    },
    {
        title: "共享工作室",
        subtitle: "Co-working Studio",
        category: portfolioCategory.Office,
        images: generateImages(9, 3),
    },
];
export default portfolioItems
