def test_forecast(client):
    result = client.post(
        '/forecast',
    )

    assert result.data.decode() == 'TODO'
    assert result.status_code == 201
