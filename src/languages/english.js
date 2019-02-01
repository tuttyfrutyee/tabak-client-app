export default {
    categories : {
        specialRequest : {
            title : "Special Request", // "Özel İstek"
            placeholder : "(Serviette, ice, fork...)", // "İstediğinizi yazın(Peçete, buz, çatal...)"
            actionTitle : "Send", // "Gönder"
            verifiyingMessage : "Special request has been sent!"
        }
    },
    banner : {
        languagePreference : {
            title : "Language Preference" // "Dil Seçimi"
        }
    },
    subCategories : {
        titles : {
            frequentlyOrdered : "Frequently Ordered", // "Sıkça Tercih Edilenler"
            others : "Others" // "Diğerleri"
        }
    },
    product : {
        product : {
            titles : {
                options : "Options", // "Seçenekler"
                extras : "Extras", // "Ekstralar"
                addToPlate : "Add to plate", // "Tabağa Ekle"
                minuteShorted : "min", // "dk."
                product : "product" // "ürün"
            }
        },
        productSettings : {
            titles : {
                cancel : "Cancel", // "Vazgeç"
                saveChanges : "Save Changes" // "Değişiklikleri Kaydet"
            }
        }
    },
    plate : {
        plate : {
            title : "Plate", // "Tabak"
            titles : {
                plate : "Plate", // "Tabağınız"
                sendOrder : "Send Order", // "Siparişi Gönder"
                goesWellWith : "Makes good combination with...", // "Yanına yakışır..."
                extra : "Extra" // "Ekstra"
            },
            orderNote : {
                title : "Order Note", // "Sipariş Notu"
                verifyingTitle : "Appended", // "Eklendi"
                dialogTitle : "Order Note", // "Sipariş Notunuz"
                placeholder : "Type your order note" // "İletilmesini istediğiniz sipariş notunu yazın."
            },
            orderValidation : {
                message : "Do you confirm your order?", // "Sipariş gönderme işlemini onaylıyor musunuz?"
                buttons : {
                    cancel : "Cancel", // "Vazgeç"
                    confirm : "Yes, I confirm!" // "Evet, onayla!"
                }
            },
            orderVerification : {
                dialogTitle : "Your order is delivered", // "Siparişiniz alındı"
                dialogContent : "Order status can be tracked from track tab", // "Takip sekmesinden sipariş durumunu kontrol edebilirsiniz"
            },
            empty : {
                content : "No product in plate" // "Tabağınızda ürün yok"
            }
        },
        track : {
            title : "Track", // "Takip"
            orderStates : {
                preparing : "In Process", // "Hazırlanıyor"
                delivered : "Delivered" // "İletildi"
            },
            checkRequest : {
                title : "Check Please", // "Hesap İste"
                titleExp : "(Calls a waiter)", // "(Garson çağırır)"
                verification : {
                    message : "Check request will be sent. Do you confirm?", //"Hesap isteği gönderilicek. Onaylıyor musunuz?"
                    buttons : {
                        cancel : "Cancel", // "Vazgeç"
                        accept : "Yes, I do confirm", // "Evet, onayla!"
                    }
                }                
            },
            empty : {
                content : "No product to track" // "Takip edilicek bir ürün yok"
            },
            orderTypes : {
                productRequest : "Product Request",
                orderNote : "Order Note",
                specialRequest : "Special Request",
                checkRequest : "Check Request"
            }            
        }
    },

}