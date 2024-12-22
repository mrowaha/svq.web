"use client";

import { useServiceStore } from "@/lib/infra/mobx/root-store.provider";

function Login() {
  const { authService } = useServiceStore();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => authService.login("rowaha", "rowaha")}>
        Log in try
      </button>
    </div>
  );
}

export default Login;
