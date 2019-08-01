var budgetController = (function(){
    var Expense = function (id,description,value) {
        this.id = id;
        this.description =description;
        this.value = value;
        this.percentage =-1;

    };
    Expense.prototype.calcPercentages = function (totalIncome) {
        if(totalIncome>0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }
        else
            this.percentage=-1;
        };
    
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id,description,value) {
        this.id = id;
        this.description =description;
        this.value = value;
    };
    

    var data ={
        allItems:{
            exp:[],
            inc:[]
        },
        totals :{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1

        
    };

    var calculateTotal = function (type) {
        var sum =0;

        data.allItems[type].forEach(function (current ) {
            sum += current.value;
        });
        data.totals[type]=sum;
        // return sum;
    };





    return {
    addItem: function (type ,des,val) {
        var newItem;
        // create new id
        if(data.allItems[type].length>0){
            Id =data.allItems[type][data.allItems[type].length-1].id +1;
        }else Id=0;

        if(type === 'exp'){
            newItem = new Expense(Id,des,val);
        }
        else if(type === 'inc'){
            newItem = new Income(Id,des,val);
        }
        // add the item into data structure
        data.allItems[type].push(newItem);
        //return new item
        return newItem;
    },

        deleteItems: function(type,id){
        var ids, index;
        ids = data.allItems[type].map(function(current){
            return current.id;
        });
        index = ids.indexOf(id);
        if (index!==-1){
             data.allItems[type].splice(index,1);
        }
        },
        calculateBudget:function(){
           //1 calculate the total
            calculateTotal('exp');
            calculateTotal('inc');

            //2 calculate the budget   income - expenses

            data.budget=data.totals.inc-data.totals['exp'];

            //3 calculate the percentage of income we spent
            if(data.totals.inc>0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else{
                data.percentage =-1;
            }
        },
        calculatePercentages: function(){
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentages(data.totals.inc);
            })
        },
        getPercentages:function(){
        var allperc = data.allItems.exp.map(function (cur) {
            return cur.getPercentage();
        });
        return allperc;
        },
        getBudget : function(){
        return{
            budget:data.budget,
            totalinc :data.totals.inc,
            totalexp:data.totals.exp,
            percentage:data.percentage
        };
        },
        testing:function () {
            console.log(data);
        }
    };
})();
///////////////////////////////////////////////////////////////////////////////////////////////////////

var uiController = (function () {
    var DomInput = {
        inType: '.add__type',
        inDes: '.add__description',
        inValue: '.add__value',
        inBtn : '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel:'.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatnumber= function (num,type) {


        num = Math.abs(num);
        num= num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if(int.length>3){
            int = int.substr(0,int.length-3)+','+int .substr(int.length-3,3);
        }
        dec = numSplit[1];

        type === 'exp'? sign ='-':sign ='+';
        return sign +' '+int+'.'+dec;
    };

    var nodeListForEach = function(list,callback){
        for(var i =0; i<list.length; i++){
            callback(list[i],i);
        }
    };
    return{
        getInput:function () {
            return{
                type : document.querySelector(DomInput.inType).value,
                description: document.querySelector(DomInput.inDes).value,
                value : parseFloat(document.querySelector(DomInput.inValue).value)
            };
        },

        addListItem: function(obj,type){
            var html,newhtml,element;

            //add html text with placeholder text
            if(type==='inc') {
                element = DomInput.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%">\n' +
                    '                            <div class="item__description">%description%</div>\n' +
                    '                            <div class="right clearfix">\n' +
                    '                                <div class="item__value"> %value%</div>\n' +
                    '                                <div class="item__delete">\n' +
                    '                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>'
            }
            else if(type==='exp'){
                element = DomInput.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%">\n' +
                    '                            <div class="item__description">%description%</div>\n' +
                    '                            <div class="right clearfix">\n' +
                    '                                <div class="item__value">%value%</div>\n' +
                    '                                <div class="item__percentage">21%</div>\n' +
                    '                                <div class="item__delete">\n' +
                    '                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n'
            }
            //replace placehoders with actual data
            newhtml = html.replace('%id%',obj.id);
            newhtml = newhtml.replace('%description%',obj.description);
            newhtml = newhtml.replace('%value%',formatnumber(obj.value,type));

            //insert into html dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
        },
        deleteListItem: function(seletorId){
            var element ;
            element = document.getElementById(seletorId);
            element.parentNode.removeChild(element);
        },

        clearFields:function(){
          var fields,fieldsArr;
          //queryselectorall returns a list
          fields = document.querySelectorAll(DomInput.inDes+','+DomInput.inValue);

          fieldsArr = Array.prototype.slice.call(fields);

          fieldsArr.forEach(function (current,index,array) {
              current.value ="";
          });

          fieldsArr[0].focus();
        },
        displayBudget:function(obj){
            var type ;
             obj.budget >0? type ='inc':type = 'exp';
          document.querySelector(DomInput.budgetLabel).textContent= formatnumber(obj.budget,type);
          document.querySelector(DomInput.incomeLabel).textContent= formatnumber(obj.totalinc,'inc');
          document.querySelector(DomInput.expensesLabel).textContent=formatnumber(obj.totalexp,'exp');

            if(obj.percentage>0){
            document.querySelector(DomInput.percentageLabel).textContent=obj.percentage+'%';}
            else document.querySelector(DomInput.percentageLabel).textContent="---";
        },
        displayPercentages :function(percentages){
            var fields = document.querySelectorAll(DomInput.expensesPercLabel);


            
            nodeListForEach(fields,function (current,index) {
                if(percentages[index]>0) {
                    current.textContent = percentages[index] + '%';
                } else
                    current.textContent = '---';
            });

        },

        displayMonth:function(){
            var months = ['January','february','march','april','may','june','july','august','september','october','november','december'];
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            document.querySelector(DomInput.dateLabel).textContent = months[month] +' '+ year;
        },

        changedType: function(){
           var fields = document.querySelectorAll(
                DomInput.inType +','+
                DomInput.inDes +','+
                DomInput.inValue
            );
            nodeListForEach(fields,function (cur) {
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DomInput.inBtn).classList.toggle('red');
        },

        getDom :function () {
            return DomInput;
        }
    }

})();


var controller = (function (budCtrl , uiCtrl) {
// for adding on clicking add
    var setUpEvntList = function(){
        var Dom =uiCtrl.getDom();
        document.querySelector(Dom.inBtn).addEventListener('click', cntrlAddItem);
        // for adding on hitting enter
        document.addEventListener('keypress',function (event) {
            if(event.keyCode === 13|| event.keyCode===13){
                console.log('key');
                cntrlAddItem();
            }
        });
        document.querySelector(Dom.container).addEventListener('click',cntrlDelItem);
        document.querySelector(Dom.inType).addEventListener('change',uiCtrl.changedType);

    };

    //update budget
    var updateBudget = function () {
        //1 calculate budget
        budgetController.calculateBudget();
        var budget = budgetController.getBudget();
        console.log(budget);
        // return budget;
        uiCtrl.displayBudget(budget);
    };

    var updatePercentage = function () {
      // calculate percentage
        budgetController.calculatePercentages();

      // read percentage from budget controller
        var percentages = budgetController.getPercentages();
      // update the UI with the new percentage
      //   console.log(percentages);
        uiCtrl.displayPercentages(percentages);
    };

    //for adding item
    var cntrlAddItem = function(){


        //recipe
        //1. get the filled input data
        var input = uiCtrl.getInput();
        console.log(input);
        //2. add the item to the budget controller
        if(input.description!=="" && !isNaN(input.value)&& input.value>=0){
        var newItem = budCtrl.addItem(input.type,input.description,input.value);
        console.log(newItem);
        //3. add the iem to the UI
        uiCtrl.addListItem(newItem , input.type);
        //clear fields
        uiCtrl.clearFields();}
        //4. calculate the budget
        // var budget =
            updateBudget();
        //5. display the budget
        // uiCtrl.displayBudget(budget);
    // console.log('works');

        updatePercentage();
    };
    var cntrlDelItem =function (event) {
        var itemId,splitId,type,Id;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemId){
            splitId = itemId.split('-');
            type = splitId[0];
            Id = parseInt(splitId[1]);
            // console.log(splitId);
            budgetController.deleteItems(type,Id);
            // delete the item from data structure
            uiCtrl.deleteListItem(itemId);
            // delete the item from UI

            // show updated new budget
            updateBudget();

            updatePercentage();
        }
    };

    return{

       init : function (){
           uiCtrl.displayBudget({
               budget:0,
               totalinc :0,
               totalexp:0,
               percentage:-1
           });
           setUpEvntList();
           uiCtrl.displayMonth();
       }
    };
})(budgetController,uiController);

controller.init();
