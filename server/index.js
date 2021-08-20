const express = require("express")
const cors = require("cors")
const Iyzipay = require('iyzipay');

const app = express()

var iyzipay = new Iyzipay({
    apiKey: "sandbox-GnKqgLrt6n5gTKUVTKzOVi1oEWQIZEK7",
    secretKey: "sandbox-FwQFLQAUkEJfgAW6KLrWqnGflEgO9QSa",
    uri: 'https://sandbox-api.iyzipay.com'
});

app.use(express.json())
app.use(cors())

app.post("/pay",(req,res)=>{
    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: '1',
        paidPrice: '1.2',
        currency: Iyzipay.CURRENCY.TRY,
        basketId: 'B67832',
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: 'https://www.merchant.com/callback',
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
        res.json({paymentPageUrl:result.paymentPageUrl})
    });
})



app.listen(4000)