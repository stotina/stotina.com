<template>
  <div class="donate">
    <div>
      Donations to Stotina.com
    </div>
    <div
      id="money-button"
      data-to="25981@moneybutton.com"
      data-editable="true"
      data-currency="USD"
      data-amount="1"
    ></div>
  </div>
</template>

<script>
import moneyButton from "../js/moneybutton.js";

export default {
  created() {
    setTimeout(() => {
      var div = document.getElementById("money-button");
      console.log(div);
      moneyButton.render(div, {
        to: "25981@moneybutton.com",
        amount: "1",
        currency: "USD",
        editable: true,
        clientIdentifier: "bf79160e04f17de53093c87b5d4976d5",
        buttonId: "stotina-donation-button",
        buttonData: `{ "reason": "donation" }`,
        type: "tip",
        onPayment: function(arg) {
          console.log("onPayment", arg);
        },
        onError: function(arg) {
          console.log("onError", arg);
        },
      });
    }, 500);
  },
};
</script>

<style>
.donate {
  text-align: center;
  padding: 3em;
}
#money-button {
  margin: 1em;
}
</style>
