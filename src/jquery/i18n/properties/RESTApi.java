package jquery.i18n.properties;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Path("/users")
public class RESTApi {

	@Path("/{id}/tokens")
	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public Response authenticate(@PathParam("id") String id,
			Map<String, Object> payload) {
		System.out.println(id);
		if (id.equals("i18n")) {//模拟验证功能，仅当用户名为"i18n",密码为"123456"时验证成功
			String pwd = (String) payload.get("password");
			if (pwd.equals("123456")) {
				//生成模拟密钥
				Map<String, String> token = new HashMap<String, String>();
				token.put("token", "Y29udHJvbGxlci5yZWFkIiwib3BlbmlkIiwicGFzc3dvcmQud3JpdGUiXSwiZW...");
				System.out.println("200");
				return Response.status(Status.OK).entity(token).build();
			} else {
				System.out.println("401");
				return Response.status(Status.UNAUTHORIZED).build();
			}
		}
		System.out.println("403");
		return Response.status(Status.FORBIDDEN).build();
	}

}
