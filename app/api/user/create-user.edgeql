with
  name := <str>$name,
  user := (
    insert User {
      name := name,
    }
  ),
  access_token := (
    insert AccessToken {
      user := user,
      token := <str>uuid_generate_v4(),
    }
  )
select access_token.token;
