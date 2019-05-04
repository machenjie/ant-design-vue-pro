export default class Auth {
  static authority: string[] = [];

  static getCurrentAuthority() {
    this.authority = ["user"];
    return this.authority;
  }

  static checkAuthority(authority: string[]) {
    return this.getCurrentAuthority().some(v => authority.includes(v));
  }

  static isLogin() {
    const authority = this.getCurrentAuthority();
    return authority.length !== 0 && authority[0] !== "guest";
  }
}
