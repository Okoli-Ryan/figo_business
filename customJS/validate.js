const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function emailValidate(p) {
  let j = 1;

  for (let i = 0; i < p.length - 1; i++) {
    while (j < p.length) {
      if (p[i] === p[j]) {
        $(".toast-body").html(`Email at rows ${i + 1} and ${j + 1} are equal`);
        $(".toast").toast("show");
        return false;
      }
      j++;
    }
    j = i + 2;
  }

  for (let i = 0; i < p.length; i++) {
    if (!emailRegex.test(p[i])) {
      $(".toast-body").html(`Email at row ${i + 1} is invalid`);
      $(".toast").toast("show");
      return false;
    }
  }

  return true;
}
