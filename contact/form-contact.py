import cgi

def application(environ, start_response):
    if environ['REQUEST_METHOD'] == 'POST':
        form = cgi.FieldStorage(
            fp=environ['wsgi.input'],
            environ=environ,
            keep_blank_values=True
        )
        name = form.getvalue('name')
        response_body = f'Thank you for submitting, {name}!'
    else:
        response_body = '''
            <form method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name">
                <button type="submit">Submit</button>
            </form>
        '''

    status = '200 OK'
    headers = [('Content-type', 'text/html')]
    start_response(status, headers)
    return [response_body.encode()]
