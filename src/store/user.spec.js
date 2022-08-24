import useStore from "../hooks/useStore";
import { setCurrentUser, clearCurrentUser, setApiKey } from "./user";

describe("UserStore", () => {
  afterEach(() => {
    clearCurrentUser();
  });

  it("Should set current user", () => {
    const store = useStore();

    setCurrentUser({ name: "Matheus" });

    expect(store.User.currentUser.name).toBe("Matheus");
  });

  it("Should set ApiKey on current user", () => {
    const store = useStore();

    setApiKey("123");

    expect(store.User.currentUser.apiKey).toBe("123");
  });

  it("Should clean current user", () => {
    const store = useStore();

    setCurrentUser({ name: "Matheus" });

    expect(store.User.currentUser.name).toBe("Matheus");

    clearCurrentUser();

    expect(store.User.currentUser.name).toBeFalsy();
  });
});
