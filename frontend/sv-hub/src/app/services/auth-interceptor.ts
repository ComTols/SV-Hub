import {HttpInterceptorFn} from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  // Hol das Token aus dem localStorage
  const token = localStorage.getItem('userToken');

  // Wenn ein Token vorhanden ist, setze es in den Authorization-Header
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Leite die Anfrage weiter
  return next(request);
}
