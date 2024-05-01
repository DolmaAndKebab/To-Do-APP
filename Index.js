/*
Copyright 2024 DolmaAndKebab

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

if (document.getElementById("ROOT") instanceof HTMLElement) { var Root = document.getElementById("ROOT"); }

class List_Handler {

    Button_Input;
    Button_Delete;
    List_Input;
    List_Delete;
    Delete_All;
    Stored_Items = [];

    constructor(Button_Input, List_Input, Button_Delete, List_Delete, Delete_All) {
        try {
            this.Button_Input = Button_Input;
            this.List_Input = List_Input;
            this.List_Delete = List_Delete;
            this.Button_Delete = Button_Delete;
            this.Delete_All = Delete_All;
        } catch (error)
        {
            console.error(`Unexpected error when setting class variables. [ERROR]: ${error}`);
        }
    }

    HandleListAdd() {

        if (!this.Button_Input instanceof HTMLElement) {
            console.error("Unable to handle Button_Input because Button_Input is not a HTMLElement.");
            return;
        };

        this.Button_Input.addEventListener("click", () => {
            try {
                if (!this.List_Input instanceof HTMLElement) {
                    console.error("Unable to handle List_Input because List_Input is not a HTMLElement.");
                    return;
                }
                if (this.List_Input.value === "" || this.List_Input.value.length < 0) {
                    console.error("Unable to handle List_Input because List_Input is empty.");
                    return;
                };
                const Item = document.createElement("input");
                const Label = document.createElement("label");

                Item.id = this.Stored_Items.length;
                Item.value = this.List_Input.value.toString();
                Item.name = Item.id.toString();

                Label.id = `${Item.id.toString()}-Label`;
                Label.htmlFor = Item.id.toString();
                Label.innerHTML = ("List - " + `<span>(${Item.id.toString()})</span>`);

                this.Stored_Items.push(Item.id);

                document.getElementById("LIST").appendChild(Label);
                document.getElementById("LIST").appendChild(Item);
                this.List_Input.value = "";


            } catch (error) {
                console.error(`Unexpected error when handling Button_Input. [ERROR]: ${error}`);
            };
            
        });

    }

    HandleListDelete() {

        if (!this.Button_Delete instanceof HTMLElement) {
            console.error("Unable to handle Button_Delete because Button_Delete is not a HTMLElement.");
            return;
        }

        this.Button_Delete.addEventListener("click", () => {
            try {
                if (!this.List_Delete instanceof HTMLElement) {
                    console.error("Unable to handle List_Delete because List_Delete is not a HTMLElement.");
                    return;
                };
                if (this.List_Delete.value === "" || this.List_Delete.value.length < 0)
                {
                    console.error("Unable to handle List_Delete because List_Delete is empty.");
                    return;
                };
                if (isNaN(parseInt(this.List_Delete.value))) {
                    console.error("Unable to handle List_Delete because List_Delete contains a none number value.");
                    return;
                }
                if (!document.getElementById(this.List_Delete.value.toString())) {
                    console.error("Unable to handle List_Delete because List_Delete contains a number thats not in HTML.");
                    return;
                }
                if (!document.getElementById(`${this.List_Delete.value.toString()}-Label`.toString())) {
                    console.error("Unable to handle List_Delete because List_Delete contains a number that does not contain a Label.");
                    return;
                }
                const Item = document.getElementById(this.List_Delete.value.toString());
                const Label = document.getElementById(`${this.List_Delete.value.toString()}-Label`.toString());
                document.getElementById("LIST").removeChild(Label);
                document.getElementById("LIST").removeChild(Item);
                this.Stored_Items.splice(this.Stored_Items.indexOf(parseInt(this.List_Delete.value)), 1);
                this.List_Delete.value = "";
            } catch (error) {
                console.error(`Unexpected error when handling Button_Delete. [ERROR]: ${error}`);
            };

        });

    }

    HandleDeleteAll() {

        if (!this.Delete_All instanceof HTMLElement) {
            console.error("Unable to handle Delete_All because Delete_All is not a HTMLElement");
            return;
        }

        this.Delete_All.addEventListener("click", () => {
            if (this.Stored_Items.length <= 0) {
                console.error("Unable to handle Delete_All because Stored_Items is already empty.");
                return;
            };

            try {
                while (document.getElementById("LIST").firstChild) {
                    document.getElementById("LIST").removeChild(document.getElementById("LIST").firstChild);
                };
                this.Stored_Items.splice(0, this.Stored_Items.length);
            } catch (error) {
                console.error(`Unexpected error when handling Delete_All. [ERROR]: ${error}`);
            }
        
        });

    }

}

const Handler = new List_Handler(
    document.getElementById("Enter"), 
    document.getElementById("List-Input"),
    document.getElementById("Delete"),
    document.getElementById("List-Delete"),
    document.getElementById("Delete-All")
);
Handler.HandleListAdd();
Handler.HandleListDelete();
Handler.HandleDeleteAll();