import React from "react";
import "./css/print.css";
import "./css/style.css";
import moment from "moment";
import { connect } from "react-redux";

function InvoiceTemplate(props) {
  console.log(props.data);
  const { data } = props;
  const user = props.user.userData.data;
  console.log(props, "<--props");
  return (
    <div id="page-wrap-invoice">
      <p id="header">INVOICE</p>

      {/* <div id="identity">
  <p id="address">
    Chris Coyier 123 Appleseed Street Appleville, WI 53719 Phone: (555)
    555-5555
  </p>

  <div id="logo">
    <img id="image" src="images/logo.png" alt="logo" />
  </div>
</div> */}

      <div style={{ clear: "both" }}></div>

      <div id="customer">
        {/* <p id="customer-title">{user.businessName} c/o {user.name}</p> */}
        <p id="customer-title">{user.businessName} c/o {props.data?.buyerId?.name}</p>
        {/* {props.data?.buyerId?.businessName ? props.data.buyerId.businessName : "Business Name"}  */}

        <table id="meta">
          <tr>
            <td class="meta-head">Invoice #</td>
            <td>
              <p>{data.invoiceNumber}</p>
            </td>
          </tr>
          <tr>
            <td class="meta-head">Invoice Date</td>
            <td>
              <p id="date">{moment(data.createdAt).format("DD MMM, YYYY")}</p>
            </td>
          </tr>

          {data.installmentId && <tr>
            <td class="meta-head">Installment Date</td>
            <td>
              <p id="date">{moment(data.installmentId.date).format("DD MMM, YYYY")}</p>
            </td>
          </tr>}

          <tr>
            <td class="meta-head">Amount</td>
            <td>
              <div class="due">
                ${data.installmentId ? data.installmentId.amount : data.saleId.totalPrice}
                {/* {data.saleId.price +
                  data.saleId.price * (data.saleId.tax / 100)} */}
              </div>
            </td>
          </tr>
        </table>
      </div>

      <table id="items">
        <tr>
          <th>Animal</th>
          <th>Unit Cost</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>

        {data.saleId.animals.map((e) => (
          <tr class="item-row">
            <td class="item-name">
              <div class="delete-wpr">
                <p>{e.animalId.data.name}</p>
              </div>
            </td>
            <td>
              <p class="cost">${e.price}</p>
            </td>
            <td>
              <p class="qty">{e.quantity}</p>
            </td>
            <td>
              <span class="price">${e.price * e.quantity}</span>
            </td>
          </tr>
        ))}
        {data.saleId.products.map((e) => (
          <tr class="item-row">
            <td class="item-name">
              <div class="delete-wpr">
                <p>{e.productId.data.name}</p>
              </div>
            </td>
            <td>
              <p class="cost">${e.price}</p>
            </td>
            <td>
              <p class="qty">{e.quantity}</p>
            </td>
            <td>
              <span class="price">${e.price * e.quantity}</span>
            </td>
          </tr>
        ))}


        <tr>
          <td colspan="2" class="blank">
            {" "}
          </td>
          <td class="total-line">Subtotal</td>
          <td class="total-value">
            <div id="subtotal">${data.saleId.price}</div>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="blank">
            {" "}
          </td>
          <td class="total-line">Discount</td>
          <td class="total-value">
            <div id="total">${data.saleId.discount}</div>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="blank">
            {" "}
          </td>
          <td class="total-line">Tax</td>
          <td class="total-value">
            <div id="total">{data.saleId.tax}%</div>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="blank">
            {" "}
          </td>
          <td class="total-line">Total Sale Amount</td>

          <td class="total-value">
            <p id="paid">
              ${data.saleId.totalPrice}
              {/* ${data.saleId.price + data.saleId.price * (data.saleId.tax / 100)} */}
            </p>
          </td>
        </tr>

        {
          data.installmentId && (
            <>
              <tr>
                <td colspan="2" class="blank">
                  {" "}
                </td>
                <td class="total-line">Down Payment</td>

                <td class="total-value">
                  <p id="paid">
                    ${data.saleId.downpayment}
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="blank">
                  {" "}
                </td>
                <td class="total-line">Installment Amount</td>

                <td class="total-value">
                  <p id="paid">
                    ${data.installmentId.amount}
                  </p>
                </td>
              </tr>
            </>
          )
        }
        {/* <tr>
    <td colspan="2" class="blank">
      {" "}
    </td>
    <td class="total-line balance">Balance Due</td>
    <td class="total-value balance">
      <div class="due">$875.00</div>
    </td>
  </tr> */}
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(InvoiceTemplate)