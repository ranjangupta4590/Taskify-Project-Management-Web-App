import md5 from 'md5';

export function getGravatarUrl(email) {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`; // 'd=identicon' provides a default image if the user doesn't have a Gravatar
}
