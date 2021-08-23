const router= require('express').Router()
const iyzipay = require("../utils/iyzipay")
const Iyzipay = require('iyzipay');
const Bill = require("../models/bill")

router.post("/pay",(req,res)=>{

    const bill = new Bill({
        name:req.body.name,
        msg:req.body.msg,
        token:'',
        amount:req.body.amount,
        isPaid:false
    })

    bill.save().then(item=>{
        var request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: '123456789',
            price: req.body.amount,
            paidPrice: req.body.amount,
            currency: Iyzipay.CURRENCY.TRY,
            basketId: 'B67832',
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: ('http://localhost:4000/api/bill/checkout?bill='+item.id),
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
            item.token = result.token
            item.save()
            res.json({paymentPageUrl:result.paymentPageUrl})
        });
    })
    .catch(err=>{
        res.json({error:err.message})
    })
})


router.post("/checkout",(req,res)=>{
    if(req.query.bill){
        Bill.find({_id:req.query.bill},(err,bills)=>{
            const bill = bills[0]
            if(!err){
                if(bill){
                    iyzipay.checkoutForm.retrieve({
                        locale: Iyzipay.LOCALE.TR,
                        conversationId: '123456789',
                        token: bill.token
                    }, function (err, result) {
                        if(result.paymentStatus){
                            bills[0].isPaid = true
                            bills[0].save()
                            res.redirect('http://localhost:3000/creditcard?bill='+req.query.bill);
                        }
                    });
                }
            }
        })
        
    }
    else if(req.body.bill){
        Bill.find({_id:req.body.bill},(err,bills)=>{
            const bill = bills[0]
            if(!err){
                if(bill){
                    iyzipay.checkoutForm.retrieve({
                        locale: Iyzipay.LOCALE.TR,
                        conversationId: '123456789',
                        token: bill.token
                    }, function (err, result) {
                        if(result.paymentStatus){
                            bills[0].isPaid = true
                            bills[0].save()
                            res.json({success:result.paymentStatus});
                        }
                    });
                }
            }
        })
        
    }
    
    
})

module.exports = router