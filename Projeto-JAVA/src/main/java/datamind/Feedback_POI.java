package datamind;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class Feedback_POI {
    private Integer Id;
    private String Nome;
    private String Categoria;
    private String Endereco;
    private Integer Latitude;
    private Integer Longitude;
    private String Rating_count;
    private String Tempo_Feedback;
    private String Comentario;
    private String Avaliacao;
}
