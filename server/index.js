const express = require("express")
const cors = require("cors")
const Iyzipay = require('iyzipay');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()


const app = express()

const bills = []

var iyzipay = new Iyzipay({
    apiKey: process.env.APIKEY,
    secretKey: process.env.SECRETKEY,
    uri: 'https://sandbox-api.iyzipay.com'
});

app.use(express.json())
app.use(cors())

app.post("/pay",(req,res)=>{
    const billId = uuidv4()
    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: req.body.amount,
        paidPrice: req.body.amount,
        currency: Iyzipay.CURRENCY.TRY,
        basketId: 'B67832',
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: ('http://localhost:4000/checkout?bill='+billId),
        enabledInstallments: [2, 3, 6, 9],
        buyer: {
            id: 'BY789',
            name: 'John',
            surname: 'Doe',
            gsmNumber: '+905350000000',
            email: 'email@email.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress ,
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        billingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        basketItems: [
            {
                id: 'BI101',
                name: 'Donate',
                category1: 'Donate1',
                category2: 'Donate2',
                itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                price: req.body.amount
            }
        ]
    };
    
    iyzipay.checkoutFormInitialize.create(request, function (err, result) {
        bills.push({
            billId:billId,
            token:result.token
        })
        res.json({paymentPageUrl:result.paymentPageUrl})
    });
})


app.post("/checkout",(req,res)=>{
    if(req.query.bill){
        const bill = bills.find(i=>i.billId === req.query.bill)
        if(bill){
            iyzipay.checkoutForm.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                token: bill.token
            }, function (err, result) {
                if(result.paymentStatus){
                    res.redirect('http://localhost:3000/creditcard?bill='+req.query.bill);
                }
            });
        }
    }
    else if(req.body.bill){
        const bill = bills.find(i=>i.billId === req.body.bill)
        if(bill){
            iyzipay.checkoutForm.retrieve({
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                token: bill.token
            }, function (err, result) {
                if(result.paymentStatus){
                    res.json({success:result.paymentStatus});
                }
            });
        }
    }
    
    
})



app.listen(4000)