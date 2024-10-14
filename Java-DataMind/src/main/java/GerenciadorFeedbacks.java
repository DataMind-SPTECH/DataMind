import lombok.Cleanup;
import org.apache.commons.collections4.IteratorUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.swing.plaf.basic.BasicIconFactory;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GerenciadorFeedbacks {

    public List<Feedback> criar() throws IOException {

        List<Feedback> feedbacks = new ArrayList<>();

        //Recuperando o arquivo
        @Cleanup FileInputStream file = new FileInputStream("Java-DataMind\\src\\main\\resources\\Feedbacks McDonalds (50).xlsx");
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
            Feedback feedback = Feedback.builder()
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

    public void imprimir(List<Feedback> feedbacks){
        feedbacks.forEach(System.out::println);
    }
}
