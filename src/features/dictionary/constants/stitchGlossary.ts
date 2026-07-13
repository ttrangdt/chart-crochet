import { StitchDefinition } from "../types/dictionary.types";

export const STITCH_GLOSSARY: StitchDefinition[] = [
  {
    symbol: "MR",
    usSymbol: "MR / mc",
    nameVi: "Vòng tròn ma thuật",
    nameEn: "Magic Ring / Magic Circle",
    difficulty: "Trung bình",
    description: "Cách tốt nhất để bắt đầu móc các chi tiết hình tròn (đầu gấu, quả bóng...). Giúp siết khít lỗ tâm không để lộ bông nhồi.",
    steps: [
      "Quấn sợi len quanh các ngón tay để tạo thành một vòng tròn chồng lên nhau.",
      "Luồn kim móc dưới vòng tròn, bắt sợi len và kéo qua để tạo một vòng thòng lọng.",
      "Móc 1 mũi bính (CH) để khóa vòng tròn lại.",
      "Móc các mũi đơn (X) theo số lượng yêu cầu vào trong vòng tròn.",
      "Cầm đuôi len ngắn rút chặt để vòng tròn khép kín lại."
    ],
    svgType: "mr"
  },
  {
    symbol: "CH",
    usSymbol: "ch",
    nameVi: "Mũi bính (Mũi xích)",
    nameEn: "Chain Stitch",
    difficulty: "Dễ",
    description: "Mũi móc nền tảng đầu tiên để tạo chuỗi bính xuất phát hoặc tăng chiều cao hàng mới.",
    steps: [
      "Tạo một nút thòng lọng (slip knot) trên kim móc.",
      "Vòng len từ sau ra trước qua kim móc (Yarn Over).",
      "Kéo kim móc cùng sợi len vừa vắt qua vòng thòng lọng trên kim.",
      "Lặp lại để tạo chuỗi xích bính dài."
    ],
    svgType: "chain"
  },
  {
    symbol: "X",
    usSymbol: "sc",
    nameVi: "Mũi đơn",
    nameEn: "Single Crochet",
    difficulty: "Dễ",
    description: "Mũi móc nền tảng chủ chốt nhất của Amigurumi, cho thớ len phẳng mịn, kín kẽ và chắc chắn.",
    steps: [
      "Đâm kim móc xuyên qua chân mũi kế tiếp.",
      "Vắt dây len qua kim móc.",
      "Kéo sợi dây len đó xuyên qua chân móc cũ về phía trước (có 2 vòng trên kim).",
      "Vắt len tiếp tục rồi kéo qua cả 2 vòng len cùng một lúc."
    ],
    svgType: "single"
  },
  {
    symbol: "V",
    usSymbol: "inc",
    nameVi: "Mũi tăng (Mũi mở rộng)",
    nameEn: "Single Crochet Increase",
    difficulty: "Dễ",
    description: "Móc hai mũi đơn (X) vào cùng một chân móc để mở rộng chu vi sản phẩm.",
    steps: [
      "Móc 1 mũi đơn (X) hoàn chỉnh vào chân móc kề tiếp.",
      "Đâm kim tiếp tục lần thứ hai vào chính chân móc đó.",
      "Móc thêm 1 mũi đơn (X) nữa vào đó để hoàn thành tăng mũi."
    ],
    svgType: "increase"
  },
  {
    symbol: "A",
    usSymbol: "dec",
    nameVi: "Mũi giảm",
    nameEn: "Single Crochet Decrease",
    difficulty: "Trung bình",
    description: "Thu nhỏ chu vi bằng cách chập 2 chân móc cũ thành 1. Nên dùng mũi giảm ẩn (Invisible Decrease) cho thú bông sạch đẹp.",
    steps: [
      "Luồn kim qua cạnh trước (Front Loop Only - FLO) của chân móc thứ nhất.",
      "Luồn tiếp kim qua cạnh trước của chân móc thứ hai (3 vòng trên kim).",
      "Vắt len và kéo qua 2 vòng cạnh trước vừa luồn (còn 2 vòng trên kim).",
      "Vắt len tiếp lần nữa và kéo qua nốt 2 vòng còn lại."
    ],
    svgType: "decrease"
  },
  {
    symbol: "W",
    usSymbol: "inc3",
    nameVi: "Mũi tăng ba",
    nameEn: "3 Single Crochet in 1 Stitch",
    difficulty: "Trung bình",
    description: "Móc 3 mũi đơn (X) vào cùng một chân móc cũ. Thường ứng dụng tạo các góc nhọn của hình chữ nhật, hoặc gai thú bông.",
    steps: [
      "Móc mũi đơn thứ nhất vào chân móc cũ.",
      "Móc tiếp mũi đơn thứ hai vào chính chân móc đó.",
      "Móc tiếp mũi đơn thứ ba vào chính chân móc đó để có 3 mũi chụm chân."
    ],
    svgType: "w"
  },
  {
    symbol: "M",
    usSymbol: "dec3",
    nameVi: "Mũi giảm ba",
    nameEn: "Single Crochet 3 Together",
    difficulty: "Trung bình",
    description: "Chập liền 3 chân móc kề nhau lại thành 1 mũi duy nhất để giảm kích cỡ nhanh hoặc tạo nếp bóp gấp nhọn.",
    steps: [
      "Luồn kim qua cạnh trước (FLO) của chân móc thứ nhất, thứ hai và thứ ba liên tiếp.",
      "Vắt len kéo qua cả 3 cạnh trước vừa luồn.",
      "Vắt len lần nữa và kéo qua hai vòng dây còn lại trên kim để chập thành 1."
    ],
    svgType: "m"
  },
  {
    symbol: "T",
    usSymbol: "hdc",
    nameVi: "Mũi nửa kép (Mũi chữ T)",
    nameEn: "Half Double Crochet",
    difficulty: "Trung bình",
    description: "Mũi có chiều cao trung bình giữa mũi đơn và mũi kép, có tính co dãn tốt và liên kết mềm mại mượt mà.",
    steps: [
      "Vắt một vòng len qua kim móc trước khi luồn kim.",
      "Đâm kim xuyên qua chân mũi bính kề cạnh, vắt len kéo lên (có 3 vòng trên kim).",
      "Vắt len lần nữa rồi kéo kim lách qua hết cả 3 vòng cùng lúc."
    ],
    svgType: "half-double"
  },
  {
    symbol: "F",
    usSymbol: "dc",
    nameVi: "Mũi kép đơn",
    nameEn: "Double Crochet",
    difficulty: "Trung bình",
    description: "Mũi cao, thưa thoáng, thường làm diềm ren, trang phục búp bê hoặc hoa len.",
    steps: [
      "Vắt một vòng len qua kim móc, đâm kim xuyên qua chân móc cũ.",
      "Kéo len lên trước (có 3 vòng trên kim).",
      "Vắt len kéo dứt khoát qua 2 vòng len đầu tiên (còn 2 vòng trên kim).",
      "Vắt len và kéo qua nốt 2 vòng len cuối cùng."
    ],
    svgType: "double"
  },
  {
    symbol: "E",
    usSymbol: "tr",
    nameVi: "Mũi kép đôi",
    nameEn: "Treble Crochet",
    difficulty: "Trung bình",
    description: "Mũi rất cao, độ rủ tốt, thường để tạo cánh hoa dài thanh lịch hoặc lá cây.",
    steps: [
      "Quấn len 2 vòng quanh đầu kim móc.",
      "Đâm kim xuyên qua chân bính cũ, vắt len kéo qua phía trước (có 4 vòng trên kim).",
      "Vắt len kéo qua 2 vòng đầu tiên (còn 3 vòng trên kim).",
      "Vắt len kéo qua 2 vòng tiếp theo (còn 2 vòng trên kim).",
      "Vắt len kéo qua nốt 2 vòng cuối cùng."
    ],
    svgType: "treble"
  },
  {
    symbol: "SL",
    usSymbol: "sl st",
    nameVi: "Mũi dời (Mũi trượt)",
    nameEn: "Slip Stitch",
    difficulty: "Dễ",
    description: "Mũi thấp nhất dùng để khóa vòng tròn ma thuật, kết vòng móc hoa hoặc trượt lướt qua các chân mũi.",
    steps: [
      "Đâm kim qua chân móc kế tiếp.",
      "Vắt dây len qua kim đơn.",
      "Kéo thẳng sợi len đó lách qua chân móc cũ và vòng sẵn có trên kim móc."
    ],
    svgType: "slip"
  },
  {
    symbol: "BLO",
    usSymbol: "BLO",
    nameVi: "Móc cạnh sau (Back Loop Only)",
    nameEn: "Back Loop Only",
    difficulty: "Trung bình",
    description: "Chỉ đâm kim qua một cạnh nằm phía sau của chuỗi mũi chữ V. Giúp tạo đường vân hằn ngang dùng làm búp bê đứng vững, lật vành...",
    steps: [
      "Thay vì luồn qua cả 2 cạnh chữ V của chân móc cũ.",
      "Luồn kim chỉ qua 1 cạnh sau xa mắt mình nhất (Back Loop).",
      "Thực hiện móc mũi đơn (hoặc các mũi khác) bình thường trên cạnh sau đó."
    ],
    svgType: "blo"
  },
  {
    symbol: "FLO",
    usSymbol: "FLO",
    nameVi: "Móc cạnh trước (Front Loop Only)",
    nameEn: "Front Loop Only",
    difficulty: "Trung bình",
    description: "Chỉ đâm kim móc qua cạnh phía trước (phía giáp gần mắt bạn nhất). Dùng móc váy búp bê rẽ nhánh, làm xòe bèo nhún.",
    steps: [
      "Xác định cạnh trước của chân mũi chữ V (nằm gần phía bạn nhất).",
      "Đâm kim dứt khoát chỉ qua duy nhất 1 cạnh trước này.",
      "Thực hiện móc mũi đơn (X) hoặc mũi bính khác lên cạnh đó."
    ],
    svgType: "flo"
  },
  {
    symbol: "BO",
    usSymbol: "bo / bobble",
    nameVi: "Mũi hạt bắp (Mũi hạt nổi)",
    nameEn: "Bobble Stitch",
    difficulty: "Khó",
    description: "Gồm nhiều mũi kép đơn chung chân chập đầu lại để tạo ra các điểm gồ nổi 3D tinh nghịch (má hồng gồ, ngón chân thú bông...).",
    steps: [
      "Cách làm 5 kép chụm đầu: Vắt len đâm kim móc 1 mũi kép đơn mở (chưa rút 2 vòng cuối).",
      "Tiếp tục móc thêm 4 mũi kép đơn mở như vậy vào cùng chân móc cũ (lúc này có 6 vòng trên kim).",
      "Vắt len kéo dứt khoát sợi qua toàn bộ 6 vòng cùng lúc.",
      "Móc 1 bính khóa để ép khối hạt nổi tròn hẳn lên."
    ],
    svgType: "bo"
  },
  {
    symbol: "FO",
    usSymbol: "FO / fasten off",
    nameVi: "Chốt sợi (Cắt len / Kết thúc)",
    nameEn: "Fasten Off",
    difficulty: "Dễ",
    description: "Thao tác kết thúc cuối cùng để chốt dứt điểm sợi len, cắt sợi và giấu len thừa vào lòng thú bông để không bị tuột hàng.",
    steps: [
      "Móc 1 mũi dời (SL) vào chân kế tiếp để làm phẳng mép nối.",
      "Dùng kéo cắt sợi len chừa lại một đoạn dài khoảng 10 - 15 cm.",
      "Kéo thẳng kim móc lên để rút hết đầu sợi len qua vòng kim.",
      "Xỏ sợi len thừa vào kim khâu rồi đưa sâu luồn lách giấu đầu chỉ thừa vào ruột nhồi bông."
    ],
    svgType: "fo"
  }
];
