document.addEventListener('DOMContentLoaded',()=>{
    let order=JSON.parse(localStorage.getItem('order'))||{}
    const orderSummary=document.getElementById('order-summary')
    const totalDisplay=document.getElementById('total')

    function calculateTotal(){
        return Object.values(order).reduce((sum,item)=>sum+item.price*item.quantity,0)
    }

    function updateTotal(){
        totalDisplay.textContent=calculateTotal().toFixed(2)
    }

    function addToOrderList(name,price,quantity){
        const li=document.createElement("li")
        li.className="list-group-item"
        li.innerHTML=`
        ${name} - &#8377;${price} -${quantity}=&#8377;${(price*quantity).toFixed(2)}
        <span class="order-controls">
        <span class="increase-qty" data-name="${name}">+</span>
        <span class="decrease-qty" data-name="${name}">-</span>
        <span class="remove-item" data-name="${name}">&times</span>
        </span>
        `
        orderSummary.appendChild(li)
    }

    function loadOrder(){
        orderSummary.innerHTML=""
        for(const name in order){
            const{price , quantity}=order[name]
            addToOrderList(name,price,quantity)
        }
        updateTotal()
    }
    loadOrder()

    document.querySelectorAll('.menu-item').forEach(item=>{
        item.addEventListener('click',()=>{
            const name=item.dataset.name;
            const price=parseFloat(item.dataset.price)
            if(order[name]){
                order[name].quantity++
            }else{
                order[name]={price,quantity:1}
            }
            localStorage.setItem("order",JSON.stringify(order))
            loadOrder()
        })
    })
    document.getElementById('search').addEventListener("keyup",function(){
        const value=this.value.toLowerCase()
        document.querySelectorAll('.menu-item').forEach(item =>{
            item.style.display=item.textContent.toLowerCase().includes(value)?"":"none"
        })
    })

    orderSummary.addEventListener('click',function(e){
        const name=e.target.dataset.name
        if(!name) return
        if(e.target.classList.contains('remove-item')){
            delete order[name]
        }else if(e.target.classList.contains('increase-qty')){
            order[name].quantity++
        }else if(e.target.classList.contains('decrease-qty')){
           if(order[name].quantity>1){
             order[name].quantity--
           }else{
            delete order[name]
           }
        }
        localStorage.setItem("order",JSON.stringify(order))
        loadOrder()
    })
    document.getElementById('clear-order').addEventListener('click',function(){
        order={}
        localStorage.setItem("order",JSON.stringify(order))
        loadOrder()
    })
document.getElementById('print-bill').addEventListener('click', function () {
    const order = JSON.parse(localStorage.getItem('order')) || {};
    const now = new Date();

    let billWindow = window.open('', '', 'width=600,height=700');
   
    
    let html = `
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Restaurant Bill</title>
        <style>
            body { font-family: 'Courier New', Courier, monospace; padding: 20px; }
            h2, h4 { text-align: center; margin: 0; }
            .header, .footer { text-align: center; margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border-bottom: 1px dashed #000; padding: 8px; text-align: left; }
            .total-line td { font-weight: bold; border-top: 1px solid #000; }
            .footer-note { font-size: 12px; margin-top: 30px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>Your Restaurant Name</h2>
            <p>${now.toLocaleDateString()} | ${now.toLocaleTimeString()}</p>
            <p>Order Receipt</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Rate </th>
                    <th>Amount </th>
                </tr>
            </thead>
            <tbody>`;

    let total = 0;
    for (const name in order) {
        const { price, quantity } = order[name];
        const itemTotal = price * quantity;
        total += itemTotal;
        html += `
            <tr>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>&#8377;${price.toFixed(2)}</td>
                <td>&#8377;${itemTotal.toFixed(2)}</td>
            </tr>`;
    }

    html += `
            <tr class="total-line">
                <td colspan="3" style="text-align:right;">Total</td>
                <td>${total.toFixed(2)}</td>
            </tr>
        </tbody>
    </table>
    <div class="footer-note">
        <p>Thank you for dining with us!</p>
        <p>Visit Again </p>
    </div>
    </body>
    </html>
    `;

    billWindow.document.write(html);
    billWindow.document.close();
    billWindow.print();
});

})

