const mercadopago = require ('mercadopago')

mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});



module.exports = {
    home: (req, res) => {
        return res.render("index");
    },
    detail: (req, res) => {
        return res.render("detail", { ...req.query });
    },
    comprar: (req,res) => {
        const host= 'https://mp-consek.herokuapp.com/' //'http://localhost:3000/'
        const url= host + 'callback?status='

        /*
        let item = {
            id: 0,
            picture_url: '',
            title: '',
            price: '',
            description: '',
            unit_price: '',
            quantity: 1
        }
        */
        let preference = {
            payer:{
                
                name: 'Ryan',
                surname: 'Dahl',
                email: 'test_user_63274575@testuser.com',
                phone:{
                    area_core: 11,
                    number: 55556666,
                },
                address:{
                    
                    street_name: 'Monroe',
                    street_number: 860,
                    zip_code: '1234',
                },
                
            },
            payment_methods : {
                excluded_payment_methods:[
                    {id:'visa'}
                ],
                excluded_payment_type : [
                    {id:'atm'}
                ],
                installments: 12, 
            },
            
            items: [
                {
                    id: 1234,
                    title: 'El producto - Consek company',
                    description: 'Dispositivo móvil de Tienda e-commerce',
                    picture_url: 'https://www.consekcomp.com/img/logo/logo.png',
                    category_id: 'Consek company',
                    quantity: 1, //Number('1')
                    currency_id: 'ARS',
                    unit_price: 100, //Number('100')
                }
            ],
            external_reference: 'jtomaschiesa@gmail.com',
           
            
            back_urls:{
                success: url + 'success',
                pending: url + 'pending',
                failure: url + 'failure',
            },
            notification_url: host+'notifications',
            auto_return: 'approved',
            
        }
        
        
        mercadopago.preferences.create(preference)
        .then(function(response){
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            //   global.id = response.body.id;
            global.init_point = response.body.init_point;
            //console.log(response)
            res.render('confirm')
        }).catch(function(error){
            console.log(error);
            res.send('error')
        });
        
        
    },
    callback: (req, res)=>{
        console.log(req.query); //Esta info es necesaria almacenarla en una DB
        if (req.query.status.includes('success')){
            return res.render('success')
        }
        
        if (req.query.status.includes('pending')){
            return res.render('pending')
        }
        
        if (req.query.status.includes('failure')){
            return res.render('failure')
        }
        
        return res.status(404).end()
    },
    notifications: (req, res)=>{
        console.log(req.body)

        res.status(200).end('Op OK!')
    }
}