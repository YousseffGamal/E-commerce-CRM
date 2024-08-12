import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import WOW from "wow.js";
import SecondItem from "../../../public/images/p-16-md.webp";

import "animate.css/animate.min.css";

function Payment() {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  return (
    <>
      <section>
        <div className="container py-5">
          <div className="card">
            <div className="card-body">
              <div className="row d-flex justify-content-center pb-5">
                <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
                  <div className="py-4 d-flex flex-row">
                    <h5><span className="far fa-check-square pe-2" /><b>FashionShop</b> |</h5>
                    <span className="ps-2">Checkout</span>
                  </div>
                  <h4 className="text-success">$120.00</h4>
                  <h4>Order Summary</h4>
                  <div className="d-flex pt-2">
                    <div>
                      <p>
                        <b>Total Items: <span className="text-success">1</span></b>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex" style={{ display: 'flex', alignItems: 'center',marginBottom:"20px" }}>
  <img style={{ width: '50px', height: '50px' }} src={SecondItem} alt="Item" />
  <p style={{ marginLeft: 'auto' }}>$300</p>
</div>

                  <p>
                    Review your items and proceed to payment. You can apply discount codes or adjust quantities in the cart.
                  </p>
                  <div className="rounded d-flex bg-body-tertiary">
                    <div className="p-2">Discount Applied</div>
                    <div className="ms-auto p-2">- $20.00</div>
                  </div>
                  <hr />
                  <div className="pt-2">
                    <div className="d-flex pb-2">
                      <div>
                        <p>
                          <b>Total Balance <span className="text-success">$100.00</span></b>
                        </p>
                      </div>
                      <div className="ms-auto">
                        <p className="text-primary">
                          <i className="fas fa-plus-circle text-primary pe-1" />Add payment card
                        </p>
                      </div>
                    </div>
                    <p>
                      Your payment information is securely processed. You can add or change your payment method before finalizing your order.
                    </p>
                    <form className="pb-3">
                      <div className="d-flex flex-row pb-3">
                        <div className="d-flex align-items-center pe-2">
                          <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1" defaultValue aria-label="..." defaultChecked />
                        </div>
                        <div className="rounded border d-flex w-100 p-3 align-items-center">
                          <p className="mb-0">
                            <i className="fab fa-cc-visa fa-lg text-primary pe-2" />Visa Debit
                            Card
                          </p>
                          <div className="ms-auto">************3456</div>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div className="d-flex align-items-center pe-2">
                          <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2" defaultValue aria-label="..." />
                        </div>
                        <div className="rounded border d-flex w-100 p-3 align-items-center">
                          <p className="mb-0">
                            <i className="fab fa-cc-mastercard fa-lg text-body pe-2" />Mastercard
                            Credit
                          </p>
                          <div className="ms-auto">************1038</div>
                        </div>
                      </div>
                    </form>
                    <input type="button" defaultValue="Proceed to Payment" data-mdb-ripple-init className="btn btn-primary btn-block btn-lg" />
                  </div>
                </div>
                <div className="col-md-5 col-xl-4 offset-xl-1">
                  <div className="py-4 d-flex justify-content-end">
                    <h6><a href="#!">Cancel and return to shop</a></h6>
                  </div>
                  <div className="rounded d-flex flex-column p-2 bg-body-tertiary">
                    <div className="p-2 me-3">
                      <h4>Order Recap</h4>
                    </div>
                    <div className="p-2 d-flex">
                      <div className="col-8">Subtotal</div>
                      <div className="ms-auto">$140.00</div>
                    </div>
                    <div className="p-2 d-flex">
                      <div className="col-8">Shipping</div>
                      <div className="ms-auto">$10.00</div>
                    </div>
                    <div className="p-2 d-flex">
                      <div className="col-8">Discount</div>
                      <div className="ms-auto">- $20.00</div>
                    </div>
                    <div className="border-top px-2 mx-2" />
                    <div className="p-2 d-flex pt-3">
                      <div className="col-8"><b>Total</b></div>
                      <div className="ms-auto"><b className="text-success">$130.00</b></div>
                    </div>
                    <div className="p-2 d-flex">
                      <div className="col-8">Tax</div>
                      <div className="ms-auto">$10.00</div>
                    </div>
                    <div className="border-top px-2 mx-2" />
                    <div className="p-2 d-flex pt-3">
                      <div className="col-8"><b>Total Balance</b></div>
                      <div className="ms-auto"><b className="text-success">$100.00</b></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;
