import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { Color } from "color";
import * as connectivity from "connectivity";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { User } from "~/shared/user/user";
import { UserService } from "~/shared/user/user.service";
import { setHintColor } from "~/utils/hint-util";

@Component({
  selector: "login",
  providers: [UserService],
  templateUrl: "login.html",
  styleUrls: ["login-common.css"]
})

export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;

  @ViewChild("container") container: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  constructor(private router: Router, private userService: UserService,
              private page: Page, private routerExtensions: RouterExtensions) {
      this.user = new User();
      this.user.email = "admin@admin.com";
      this.user.password = "password";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
  }

  setTextFieldColors() {
    const emailTextField = <TextField>this.email.nativeElement;
    const passwordTextField = <TextField>this.password.nativeElement;

    const mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    const hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
  }

  submit(loginType: string) {
    const connectionType = connectivity.getConnectionType();
    if (connectionType === 0) {
      alert({
        title: "No Conenction",
        message: "You have no internet connection. Please check your settings.",
        okButtonText: "Ok"
      });
      return;
    } else if (this.isLoggingIn) {
      if (loginType === "normal") {
          this.login();
      } else if (loginType === "facebook") {
          this.facebookLogin();
           } else {
          this.googleLogin();
             }
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.normalLogin(this.user)
                    .subscribe(() => {
                          // alert("You're successfully logged in!");
                          this.routerExtensions.navigate(["/list"], { clearHistory: true });
                      },
                      (error) => alert(error)
                    );
  }

  facebookLogin() {
    this.userService.facebookLogin()
                    .subscribe(() => {
                          // alert("You're successfully logged in!");
                          this.routerExtensions.navigate(["/list"], { clearHistory: true });
                      },
                      (error) => alert(error)
                    );
  }

  googleLogin() {
    this.userService.googleLogin()
                    .subscribe(() => {
                          // alert("You're successfully logged in!");
                          this.routerExtensions.navigate(["/list"], { clearHistory: true });
                      },
                      (error) => alert(error)
                    );
  }

  signUp() {
    this.userService.register(this.user)
                    .subscribe(() => {
                        alert("Your account was successfully created.");
                        this.toggleDisplay();
                    },
                    () => alert("Unfortunately we were unable to create your account.")
                  );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    this.setTextFieldColors();
    const container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }

}
