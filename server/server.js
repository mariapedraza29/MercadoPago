const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");


app.use(express.json())
app.use(cors());

mercadopago.MercadoPagoConfig.access_token =
	 "TEST-7522971752204517-030300-1442497d62373c82b99492c64b229a17-1708226957";

app.get("/", function (req,res) {
    res.send("el servidor de mercadopago funciona")
})

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			success: "http://localhost:5173",
			failure: "http://localhost:5173",
			pending: ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});