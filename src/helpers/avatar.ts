const setAvatar = (avatarQuerySelector: string, name?: string, imageSrc?: string) => {
    const avatars = document.querySelectorAll(avatarQuerySelector);
    avatars.forEach((avatar) => {
      const avatarImage = avatar.querySelector(
        ".avatar-image",
      ) as HTMLImageElement;
      const avatarInitials = avatar.querySelector(
        ".avatar-initials",
      ) as HTMLElement;
      const avatarDefault = avatar.querySelector(
        ".avatar-default",
      ) as HTMLElement;
      if (imageSrc) {
        avatarImage.src = imageSrc;
        avatarImage.classList.remove("hidden");
        avatarInitials.classList.add("hidden");
        avatarDefault.classList.add("hidden");
      } else if (name) {
        const size = avatarInitials.dataset.size;
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("");
        avatarInitials.innerHTML =
          size === "xs" || size === "sm" ? initials[0] : initials;
        avatarInitials.classList.remove("hidden");
        avatarImage.classList.add("hidden");
        avatarDefault.classList.add("hidden");
      } else {
        avatarImage.classList.add("hidden");
        avatarInitials.classList.add("hidden");
        avatarDefault.classList.remove("hidden");
      }
    })
  };
export default { setAvatar };