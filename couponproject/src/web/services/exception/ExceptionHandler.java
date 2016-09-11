package web.services.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import web.beans.Message;

@Provider
public class ExceptionHandler  implements ExceptionMapper<Exception> {
	
	@Override
	public Response toResponse(Exception exception) {
		String msgError = "General Error";
		if (exception.getMessage() != null) {
			msgError = exception.getMessage();
		}

		return Response.serverError().entity(new Message(msgError)).build();
	}
}
