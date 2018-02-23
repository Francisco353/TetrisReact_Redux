import Piece_i from "./Piece_i";
import Piece_j from "./Piece_j";
import Piece_l from "./Piece_l";
import Piece_o from "./Piece_o";
import Piece_s from "./Piece_s";
import Piece_t from "./Piece_t";
import Piece_z from "./Piece_z";


export default function PieceFactory() {
    this.createPiece = function (type) {
        var piece;

        switch (type) {
          case "piece_i":
            piece = new Piece_i();
            break;
          case "piece_j":
            piece = new Piece_j();
            break;
          case "piece_l":
            piece = new Piece_l();
            break;
          case "piece_o":
            piece = new Piece_o();
            break;
          case "piece_s":
            piece = new Piece_s();
            break;
          case "piece_t":
            piece = new Piece_t();
            break;
          case "piece_z":
            piece = new Piece_z();
            break;
          default:
            throw new Error("That type of piece doesn't exist");
        }
        return piece;

    }
}
