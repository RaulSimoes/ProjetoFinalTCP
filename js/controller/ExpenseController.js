/*
 * Expense Controller
 */

var listar = {
    carregarValoresParaLista: function(id, description, value, bairro){
        change(id, description, value, bairro);
    }
}

 expenseApp.controller('expenseController', function($scope) {
    //It should be coming from a service or DAO
    $scope.list = [];

    var i =0;
    var modoEdicao = false;     
    var indexLista;
    NUM_ITENS_DELETADOS = 1;

    $scope.addExpense = function() {    
        var expense = {};

        //testa se esta no modo edit ou insert
        if (modoEdicao) {
            expense.id = $scope.list[indexLista].id;
        } else{
            //expense.id = i++;  
            expense.id = functions.genID($scope.list);
        };  
        expense.description = $scope.description;
        expense.value = $scope.value;
        expense.bairro = $scope.bairro;

        if (modoEdicao) {
            functions.deletePublicationFromById($scope.list[indexLista].id);        
            $scope.list.splice(indexLista,NUM_ITENS_DELETADOS);            
            //$scope.list.splice(indexLista,NUM_ITENS_DELETADOS, expense);  
            $scope.list.push(expense);          
        } else{
            $scope.list.push(expense);
        }

        //zera variaveis
        $scope.description = $scope.value = "";
        $scope.bairro = "";
        modoEdicao = false;
        functions.addPublication(expense.id, expense.description, expense.value, expense.bairro);
    }


    $scope.removeItem = function(index){
        functions.deletePublicationFromById($scope.list[index].id)        
        //functions.clearObjectStore();        
        $scope.list.splice(index,NUM_ITENS_DELETADOS);
    }   


    $scope.updateItem = function(index){
        document.getElementById("description").value = $scope.list[index].description;
        document.getElementById("value").value = $scope.list[index].value;          
        document.getElementById("bairro").value = $scope.list[index].bairro;                  
        modoEdicao = true;
        indexLista = index;
    }


    $scope.listarNoticias = function(id, description, value, bairro){
        var expense = {};
        expense.id = id;
        expense.description = description;
        expense.value = value;
        expense.bairro = bairro;
        $scope.list.push(expense);        
    };    
 });

//recupera o escopo
function change(id, description, value, bairro) {
    var scope = angular.element($("#lista")).scope(); 
    scope.$apply(function(){
        /*$scope.list = {id: 1, description:"Lunch", value:22.12},
                     {id: 2, description:"Coffee", value:1.00},
                     {id: 3, description:"Desert", value:5.00};*/
        scope.listarNoticias(id,description,value, bairro);
    })
};