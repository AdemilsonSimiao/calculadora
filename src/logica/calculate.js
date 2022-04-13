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
    if (buttonName === "%") {
        if (obj.operation && obj.next){
            const result = operate(obj.total, obj.next, obj.operation);
            return{
                total: Big(result)
                .div(Big("100"))
                .toString(),
                next: null,
                operation: null,
            };
        }
        if (obj.next) {
            return {
                next: Big(obj.next)
                .div(Big("100"))
                .toString(),
            };
        }
        return {};
    }
    if (buttonName === ".") {
        if (obj.next){

            // ignora um . se o próximo número já tiver um
            if (obj.next.includes(".")){
                return {};
            }
            return {next: obj.next + "."};
        }
        return {next: "0."};
    }
    if (buttonName === "=") {
        if (obj.next && obj.operation){
            return {
                total: operate(obj.total, obj.next, obj.operation),
                next: null,
                operation: null,
            };
        }else {
       // '=' sem operação, nada a fazer
            return {};
        }
    }
    if (buttonName === "+/-") {
        if (obj.next) {
            return { next: (-1 * parseFloat(obj.next)).toString()};
        }
        if (obj.total){
            return { total: (-1 * parseFloat(obj.total)).toString()};
        }
        return {};
    }
     // Button deve ser uma operação

  // Quando o usuário pressiona um botão de operação sem ter entrado
  // um número primeiro, não faça nada.
  // if (!obj.next && !obj.total) {
  //   return {};
  // }

  // O usuário pressionou um botão de operação e existe uma operação existente
    if ( obj.operation ) {
        return {
            total: operate(obj.total, obj.next, obj.operation),
            next: null,
            operation: buttonName,
        };
    }
  // nenhuma operação ainda, mas o usuário digitou uma

  // O usuário ainda não digitou um número, apenas salve a operação
    
    if (!obj.next) {
        return { operation: buttonName};
    }
    
    // salva a operação e muda 'próximo' para 'total'
    return {
        total: obj.next,
        next: null,
        operation: buttonName,
    };
}