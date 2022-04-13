import Big from "big.js";
import isNumber from './isNumber ';
import operate from './operate';
/** Dado um nome de botão e um objeto de dados da calculadora, retorne um
* objeto de dados da calculadora.
*
* O objeto de dados da calculadora contém:
* total: String o total em execução
* next: String o próximo número a ser operado com o total
* operação:String +, -, etc. */
export default function calculate(obj, buttonName){
    if (buttonName === "AC"){
        return {
            total: null,
            next: null,
            operation: null,
        };
    }
    if (isNumber(buttonName)){
        if (buttonName === "0" && obj.next === "0"){
            return {};
        }
        //Se houver uma operação, atualize a seguir
        if (obj.operation){
            if (obj.next){
                return {next: obj.next + buttonName};
            }
            return {next: buttonName};
        }
        //Se não houver operação, atualize em seguida e limpe o valor
        if (obj.next){
            const next = obj.next === "0" ? buttonName : obj.next + buttonName;
            return {
                next, 
                total: null,
            };
            
        }
        return {
            next: buttonName,
            total: null,
        };
    }
}