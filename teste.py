import requests
from requests.exceptions import RequestException

BASE_URL = "http://localhost:3000"  # ajuste se necessário

USER_A = {"nome": "User A", "email": "user_a@example.com", "senha": "S%nha123"}
USER_B = {"nome": "User B", "email": "user_b@example.com", "senha": "S%nha123"}

def safe_call(method, url, **kwargs):
    try:
        return method(url, timeout=6, **kwargs)
    except RequestException as e:
        print(f"❌ ERRO DE REDE em {url}: {e}")
        return None

def create_user(user):
    return safe_call(requests.post, f"{BASE_URL}/usuarios", json=user)

def login(user):
    resp = safe_call(requests.post, f"{BASE_URL}/auth/login", json={
        "email": user["email"],
        "senha": user["senha"]
    })
    if resp is not None and resp.status_code == 200:
        data = resp.json()
        return data.get("access_token")
    return None

def main():
    nota = 0
    print("=== CONFORMIDADE API x APIDOC (JWT, MENSAGENS, COMENTÁRIOS) ===\n")

    # 1) Criar USER_A
    print("1) Criando USER_A ...")
    r1 = create_user(USER_A)
    if r1 is not None:
        if r1.status_code == 201:
            nota += 3
            print("   ✅ USER_A criado (201).")
        else:
            print(f"   ❌ Esperado 201, obtido: {r1.status_code}")
    else:
        print("   ❌ Sem resposta da API.")

    # 2) Criar USER_B
    print("2) Criando USER_B ...")
    r2 = create_user(USER_B)
    if r2 is not None:
        if r2.status_code == 201:
            nota += 3
            print("   ✅ USER_B criado (201).")
        else:
            print(f"   ❌ Esperado 201, obtido: {r2.status_code}")
    else:
        print("   ❌ Sem resposta da API.")

    # 3) Login USER_A
    print("3) Autenticando USER_A ...")
    token_a = login(USER_A)
    if token_a:
        nota += 2
        print("   ✅ USER_A autenticado.")
    else:
        print("   ❌ Falha no login de USER_A.")

    # 4) Login USER_B
    print("4) Autenticando USER_B ...")
    token_b = login(USER_B)
    if token_b:
        nota += 2
        print("   ✅ USER_B autenticado.")
    else:
        print("   ❌ Falha no login de USER_B.")

    # 5) USER_A cria mensagem
    print("5) USER_A criando mensagem ...")
    mensagem_id = None
    if token_a:
        headers_a = {"Authorization": f"Bearer {token_a}"}
        r5 = safe_call(requests.post, f"{BASE_URL}/mensagens", json={
            "titulo": "Título inicial",
            "conteudo": "Conteúdo inicial"
        }, headers=headers_a)
        if r5 is not None:
            if r5.status_code == 201:
                body = r5.json()
                mensagem_id = body.get("id")
                if mensagem_id and "data_criacao" in body:
                    nota += 5
                    print(f"   ✅ Mensagem criada com id={mensagem_id}.")
                else:
                    print("   ❌ Faltando id ou data_criacao.")
            else:
                print(f"   ❌ Esperado 201, obtido: {r5.status_code}")
        else:
            print("   ❌ Sem resposta da API.")

    # 6) USER_B tenta atualizar mensagem de USER_A
    print("6) USER_B tentando atualizar mensagem de USER_A ...")
    if token_b and mensagem_id:
        headers_b = {"Authorization": f"Bearer {token_b}"}
        r6 = safe_call(requests.put, f"{BASE_URL}/mensagens/{mensagem_id}", json={
            "titulo": "Alteração indevida",
            "conteudo": "Tentando alterar mensagem de outro"
        }, headers=headers_b)
        if r6 is not None:
            if r6.status_code == 403:
                nota += 4
                print("   ✅ Bloqueio correto (403).")
            else:
                print(f"   ❌ Esperado 403, obtido: {r6.status_code}")
        else:
            print("   ❌ Sem resposta da API.")

    # 7) USER_A atualiza a própria mensagem
    print("7) USER_A atualizando a própria mensagem ...")
    if token_a and mensagem_id:
        headers_a = {"Authorization": f"Bearer {token_a}"}
        r7 = safe_call(requests.put, f"{BASE_URL}/mensagens/{mensagem_id}", json={
            "titulo": "Título atualizado",
            "conteudo": "Conteúdo atualizado"
        }, headers=headers_a)
        if r7 is not None:
            if r7.status_code == 200:
                nota += 3
                print("   ✅ Mensagem atualizada (200).")
            else:
                print(f"   ❌ Esperado 200, obtido: {r7.status_code}")
        else:
            print("   ❌ Sem resposta da API.")

    # 8) USER_B cria comentário
    print("8) USER_B criando comentário ...")
    comentario_id = None
    if token_b and mensagem_id:
        headers_b = {"Authorization": f"Bearer {token_b}"}
        r8 = safe_call(requests.post, f"{BASE_URL}/mensagens/{mensagem_id}/comentarios", json={
            "conteudo": "Comentário de USER_B"
        }, headers=headers_b)
        if r8 is not None:
            if r8.status_code == 201:
                body = r8.json()
                comentario_id = body.get("id")
                if comentario_id and "data_criacao" in body:
                    nota += 4
                    print(f"   ✅ Comentário criado com id={comentario_id}.")
                else:
                    print("   ❌ Faltando id ou data_criacao no comentário.")
            else:
                print(f"   ❌ Esperado 201, obtido: {r8.status_code}")
        else:
            print("   ❌ Sem resposta da API.")

    # 9) USER_A tenta editar comentário de USER_B
    print("9) USER_A tentando editar comentário de USER_B ...")
    if token_a and mensagem_id and comentario_id:
        headers_a = {"Authorization": f"Bearer {token_a}"}
        r9 = safe_call(requests.put, f"{BASE_URL}/mensagens/{mensagem_id}/comentarios/{comentario_id}", json={
            "conteudo": "Tentativa indevida"
        }, headers=headers_a)
        if r9 is not None:
            if r9.status_code == 403:
                nota += 2
                print("   ✅ Bloqueio correto (403) ao editar comentário.")
            else:
                print(f"   ❌ Esperado 403, obtido: {r9.status_code}")
        else:
            print("   ❌ Sem resposta da API.")

    # 10) USER_B edita o próprio comentário
    print("10) USER_B editando o próprio comentário ...")
    if token_b and mensagem_id and comentario_id:
        headers_b = {"Authorization": f"Bearer {token_b}"}
        r10 = safe_call(requests.put, f"{BASE_URL}/mensagens/{mensagem_id}/comentarios/{comentario_id}", json={
            "conteudo": "Comentário editado"
        }, headers=headers_b)
        if r10 is not None:
            if r10.status_code == 200:
                nota += 2
                print("   ✅ Comentário editado (200).")
            else:
                print(f"   ❌ Esperado 200, obtido: {r10.status_code}")
        else:
            print("   ❌ Sem resposta da API.")

    # Resultado
    print("\n🎯 NOTA FINAL:", nota, "/ 30")
    if nota == 30:
        print("✅ TODOS OS TESTES PASSARAM!")
    elif nota == 0:
        print("❌ Nenhum teste passou. API pode estar fora do ar.")
    else:
        print("⚠️ Alguns testes falharam. Veja os detalhes acima.")

if __name__ == "__main__":
    main()