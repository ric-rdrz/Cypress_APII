const api = Cypress.env('APIloginURL');
const companyId = Cypress.env('singleCompanyId');
const superPayrolls = require('../../fixtures/newSuperPayrolls.json');

describe('Superpayroll - Payrolls Container',  () => {

  it('TEST CASE 1: POST SuperPayroll Weekly', () => {
    cy.request({
      method: 'POST',
      url: `${api}/super-payrolls`,
      headers: { 'X-Runa-Company-Id': `${companyId}` },
      failOnStatusCode: false,
      body: {
        payrollGroupId: `${superPayrolls[1].payrollGroupId}`,
        payrollType: `${superPayrolls[1].payrollType}`,
        startDatePeriod: `${superPayrolls[1].startDatePeriod}`,
        startDateIncidences: `${superPayrolls[1].startDateIncidences}`,
        endDatePeriod:`${superPayrolls[1].endDatePeriod}`,
        endDateIncidences: `${superPayrolls[1].endDateIncidences}`
      },
    }).as('newSuperPayroll')
    .then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.error.messages).to.be.include(
        `payrollGroupId ${superPayrolls[1].payrollGroupId} has a super payroll that has not been finalized`,
      );
      expect(response.body.error.error).to.be.equal(
        'Conflict',
      );
    });
  });
 
  it('TEST CASE 2: GET SuperPayroll by Id', () => {    
    cy.request({
      method: 'GET',
      url: `${api}/super-payrolls/${superPayrolls[0].idSuperpayroll}`,
      headers: { 'X-Runa-Company-Id': `${companyId}` },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.error.messages).to.be.include(
        `super payroll ID ${superPayrolls[0].idSuperpayroll} not found`,
      );
      expect(response.body.error.error).to.be.equal(
        'Not Found',
      );
    });
  });

});
