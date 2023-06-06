import { expect } from "chai";

import Login from "./login";

describe("Login page", () => {
  it("should return string correctly", () => {
    const login = (new Login({})).getContent();
    expect(login).to.be('HTMLElement');
  });
});
