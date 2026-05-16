describe("Login", () => {
  it("Deve logar com sucesso", () => {
    cy.Start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes.",
      );
  });

  it("Não deve logar com senha invalida", () => {
    cy.Start();
    cy.submitLoginForm("papito@webdojo.com", "katana321");
    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("Não deve logar com e-mail não cadastrado", () => {
    cy.Start();
    cy.submitLoginForm("papito1@webdojo.com", "katana123");
    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});
