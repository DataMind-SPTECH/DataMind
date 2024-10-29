package datamind;

import lombok.Cleanup;
import org.apache.commons.collections4.IteratorUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GerenciadorFeedbacks {

    public List<Feedback_POI> criar() throws IOException {

        List<Feedback_POI> feedbacks = new ArrayList<>();

        //Recuperando o arquivo
        @Cleanup FileInputStream file = new FileInputStream("src\\main\\resources\\Feedbacks McDonalds (50).xlsx");
        Workbook workbook = new XSSFWorkbook(file);

        //Setando a aba
        Sheet sheet =  workbook.getSheetAt(0);

        //Setando as linhas
        List<Row> rows = (List<Row>) toList(sheet.iterator());

        //Removendo os titulos
        rows.remove(0);

        rows.forEach(row ->{
            //Setando as celulas
            List<Cell> cells = (List<Cell>) toList(row.cellIterator());

            //Atribui os valores para classe feedback
            Feedback_POI feedback = Feedback_POI.builder()
                    .Id((int) cells.get(0).getNumericCellValue())
                    .Nome(cells.get(1).getStringCellValue())
                    .Categoria(cells.get(2).getStringCellValue())
                    .Endereco(cells.get(3).getStringCellValue())
                    .Latitude((int) cells.get(4).getNumericCellValue())
                    .Longitude((int) cells.get(5).getNumericCellValue())
                    .Rating_count(String.valueOf(cells.get(6).getNumericCellValue()))
                    .Tempo_Feedback(cells.get(7).getStringCellValue())
                    .Comentario(cells.get(8).getStringCellValue())
                    .Avaliacao(cells.get(9).getStringCellValue())


                    .build();

            feedbacks.add(feedback);
        });

        return feedbacks;
    }

    public List<?> toList(Iterator<?> iterator){
        return IteratorUtils.toList(iterator);
    }

    public void imprimir(List<Feedback_POI> feedbacks){
        feedbacks.forEach(System.out::println);
    }

    public void imprimirRecomendacao(List<Categoria> categorias){
        categorias.forEach(System.out::println);
    }

    public void imprimirPorIndice(List<Feedback_POI> feedbacks, int indice) {
        if (indice >= 0 && indice < feedbacks.size()) {
            System.out.println(feedbacks.get(indice));
        } else {
            System.out.println("Índice inválido.");
        }
    }


}
