describe("Formulário Consultoria", () => {
  it.only("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.goTo("Formulários", "Consultoria");

    cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Diogo Brumassio",
    );
    // cy.get("#name").type("Diogo Brumassio");
    cy.get('input[placeholder="Digite seu email"]').type("diogo@teste.com.br");
    // cy.get("#email").type("diogo@teste.com.br");
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");
    //Formato preenchido de acordo com a mascara do campo

    //SELECT
    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("Individual");
    //cy.get("#consultancyType").select("In Company");
    // A ação de clicar nas opções disponíveis não funciona no cypress (as opção opções vem do navegador), mas ainda sim é possível selecionar a opção e validar o valor selecionado

    //INPUT RADIO
    //XPath //span[text() = "Pessoa Física"]/..//Input
    cy.contains("label", "Pessoa Física")
      .find("input[type='radio']")
      .click()
      .should("be.checked");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("not.be.checked");

    //CPF/CNPJ
    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type("891.223.050-68")
      .should("have.value", "891.223.050-68");
    // cy.get('input[placeholder = "000.000.000-00"]')
    //   .type("891.223.050-68")
    //   .should("have.value", "891.223.050-68");

    //CHECKBOX com foreach
    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains("label", channel)
        .find("input[type='checkbox']")
        .click()
        .should("be.checked");
    });

    //INTERAGINDO COM UPLOAD DE ARQUIVOS .FILE
    cy.get('input[type="file"]').selectFile("./cypress/fixtures/exemplo.pdf", {
      force: true,
    });

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.",
    );

    // TAGS/ SIMULANDO TECLADO FÍSICOS
    const techs = ["Cypress", "React", "Node.js"];

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    // SUBMISSÃO DO FORMULÁRIO
    cy.contains("label", "termos de uso")
      .find("input[type='checkbox']")
      .check()
      .should("be.checked");

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal")
      .find(".modal-content")
      .should("be.visible")
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
      );
  });

  //ENVIANDO O FORMULÁRIO VAZIO PARA VALIDAR AS MENSAGENS DE ERRO
  it("Deve solicitar consultoria in company", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.goTo("Formulários", "Consultoria");
    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Nome Completo")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "Email")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "termos de uso")
      .parent()
      .find("p")
      .should("be.visible")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });
});
