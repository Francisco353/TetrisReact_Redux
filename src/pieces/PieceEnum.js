import { Enum } from "enumify";

class PieceEnum extends Enum {}
PieceEnum.initEnum(["piece_i","piece_j","piece_l","piece_o","piece_s",
                "piece_t","piece_z"]);


export default PieceEnum;
