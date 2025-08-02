async function refresh(refreshToken) {
  if (!refreshToken) throw createError(401, 'Refresh token necessário');

  const payload = await verificarRefreshToken(refreshToken);

  // Gerar só o access token, sem o refresh token no refresh
  const token = jwt.sign(
    { id: payload.id, email: payload.email, perfil: payload.perfil },
    process.env.JWT_SECRET || 'SENHA',
    { expiresIn: '1h' }
  );

  return { token };
}
