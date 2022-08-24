import { validateEmptyAndEmail, validateEmptyAndLength3 } from "./validators";

describe("Validators utils -> validateEmptyAndLength3", () => {
  it("Should return error message when passed empty", () => {
    expect(validateEmptyAndLength3()).toBe("*Este campo é obrigatório");
  });

  it("Should return error message when passed less than 3 char", () => {
    expect(validateEmptyAndLength3("12")).toBe(
      "*Este campo precisa conter no mínimo 3 caracteres"
    );
  });

  it("should return true when input is bigger than 3 chars", () => {
    expect(validateEmptyAndLength3("1234")).toBe(true);
  });
});

describe("Validators utils -> validateEmptyAndEmail", () => {
  it("Should return error message when passed empty", () => {
    expect(validateEmptyAndEmail()).toBe("*Este campo é obrigatório");
  });

  it("Should return error message when passed a falsy email", () => {
    expect(validateEmptyAndEmail("fulano@")).toBe("*Digite um email válido");
  });

  it("Should return true when passed and valid email", () => {
    expect(validateEmptyAndEmail("fulano@gmail.com")).toBe(true);
  });
});
