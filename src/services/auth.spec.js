import mockAxios from "axios";
import AuthService from "./auth";

jest.mock("axios");

describe("AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return a token when user login", async () => {
    const token = "123123123";
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } });
    });

    const email = "email@example.com";
    const password = "password";

    const response = await AuthService(mockAxios).login({ email, password });

    expect(response.data).toHaveProperty("token");
    expect(response).toMatchSnapshot();
  });

  it("Should return and error when user password do not match", async () => {
    const errors = { status: 404, statusText: "Password do not match" };

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors });
    });

    const response = await AuthService(mockAxios).login({
      email: "test@example.com",
      password: "1234",
    });

    expect(response).toHaveProperty("errors");
  });

  it("Should return a user when user register", async () => {
    const user = {
      name: "John",
      password: "1234",
      email: "email@example.com",
    };

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user });
    });

    const response = await AuthService(mockAxios).register(user);

    expect(response.data).toHaveProperty("name");
    expect(response.data).toHaveProperty("email");
    expect(response.data).toHaveProperty("password");
    expect(response).toMatchSnapshot();
  });
});
