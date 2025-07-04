describe('Testing the API', () => {
  const orderUrl = '/api/orders';

  describe('POST /api/orders', () => {
    describe('Testing the validations', () => {
      it('fails without post body', () => {
        cy.request({
          method: 'POST',
          url: orderUrl,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });

      it('fails without product', () => {
        cy.request({
          method: 'POST',
          url: orderUrl,
          failOnStatusCode: false,
          body: {
            qty: 1,
            price: 100,
          },
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });

      it('fails without qty', () => {
        cy.request({
          method: 'POST',
          url: orderUrl,
          failOnStatusCode: false,
          body: {
            product: 'test',
            price: 100,
          },
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });

      it('fails without price', () => {
        cy.request({
          method: 'POST',
          url: orderUrl,
          failOnStatusCode: false,
          body: {
            product: 'test',
            qty: 1,
          },
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });

      it('fails when price is not a number', () => {
        cy.request({
          method: 'POST',
          url: orderUrl,
          failOnStatusCode: false,
          body: {
            product: 'test',
            qty: 1,
            price: 'test',
          },
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });

      it('fails when qty is not a number', () => {
        cy.request({
          method: 'POST',
          url: orderUrl,
          failOnStatusCode: false,
          body: {
            product: 'test',
            qty: 'test',
            price: 100,
          },
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });

    describe('Testing the creation of orders', () => {
      it('creates an order', () => {
        cy.request({
          method: 'POST',
          url: orderUrl,
          body: {
            product: 'test',
            qty: 1,
            price: 100,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});