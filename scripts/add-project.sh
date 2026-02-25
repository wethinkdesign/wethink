#!/bin/bash
# ═══════════════════════════════════════════════════════════
# add-project.sh — 快速新增 Portfolio 案件
# ═══════════════════════════════════════════════════════════
#
# 用法:
#   ./scripts/add-project.sh <id> <圖片1> <圖片2> [圖片3] ...
#
# 範例:
#   ./scripts/add-project.sh 10 ~/photos/living.jpg ~/photos/bedroom.jpg ~/photos/kitchen.jpg
#
# 此 script 會：
#   1. 在 public/portfolio/<id>/ 建立資料夾
#   2. 複製圖片並按序號重命名 (01.jpg, 02.jpg, ...)
#   3. 輸出可直接貼到 src/app/portfolioData.js 的 JS 物件模板
#
# ═══════════════════════════════════════════════════════════

set -e

# --- 顏色 ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# --- 取得專案根目錄 ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# --- 參數檢查 ---
if [ $# -lt 2 ]; then
  echo -e "${YELLOW}用法: ./scripts/add-project.sh <id> <圖片1> <圖片2> ...${NC}"
  echo ""
  echo "範例:"
  echo "  ./scripts/add-project.sh 10 ~/photos/living.jpg ~/photos/bedroom.jpg"
  exit 1
fi

FOLDER_NAME="$1"
shift
IMAGES=("$@")

DEST_DIR="$PROJECT_ROOT/public/portfolio/$FOLDER_NAME"

# --- 建立目錄 ---
if [ -d "$DEST_DIR" ]; then
  echo -e "${YELLOW}⚠  資料夾已存在: $DEST_DIR${NC}"
  echo "   圖片將新增到現有資料夾中"
else
  mkdir -p "$DEST_DIR"
  echo -e "${GREEN}✓  已建立資料夾: public/portfolio/$FOLDER_NAME/${NC}"
fi

# --- 計算起始序號（根據已存在的圖片）---
EXISTING_COUNT=$(ls -1 "$DEST_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ')
START_NUM=$((EXISTING_COUNT + 1))

# --- 複製圖片 ---
echo ""
echo -e "${CYAN}正在複製圖片...${NC}"
IMAGE_PATHS=()
NUM=$START_NUM
for img in "${IMAGES[@]}"; do
  if [ ! -f "$img" ]; then
    echo -e "${YELLOW}⚠  找不到檔案: $img (跳過)${NC}"
    continue
  fi
  PADDED=$(printf "%02d" $NUM)
  DEST_FILE="$DEST_DIR/$PADDED.jpg"
  cp "$img" "$DEST_FILE"
  echo -e "  ${GREEN}✓${NC}  $PADDED.jpg  ←  $(basename "$img")"
  IMAGE_PATHS+=("/wethink/portfolio/$FOLDER_NAME/$PADDED.jpg")
  NUM=$((NUM + 1))
done

TOTAL=$((NUM - 1))

# --- 產生 JS 模板 ---
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}請將以下內容複製到 src/app/portfolioData.js 的陣列中：${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo ""
echo "  {"
echo "    id: $FOLDER_NAME,"
echo "    title: \"__標題__\","
echo "    subtitle: \"__English Title__\","
echo "    category: \"residential\",  // residential | commercial | office"
echo "    cover: \"${IMAGE_PATHS[0]}\","
echo "    images: ["

for p in "${IMAGE_PATHS[@]}"; do
  echo "      \"$p\","
done

echo "    ],"
echo "    tall: false,  // true = 在 grid 中佔兩行高度"
echo "  },"

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}完成！共複製了 $TOTAL 張圖片到 public/portfolio/$FOLDER_NAME/${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
