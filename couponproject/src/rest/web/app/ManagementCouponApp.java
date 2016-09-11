package rest.web.app;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import web.services.AdminService;
import web.services.CompanyService;
import web.services.CustomerService;
import web.services.exception.ExceptionHandler;
import web.services.filter.SercurityFilter;

@ApplicationPath("/coupons")
public class ManagementCouponApp extends Application {

	@Override
	public Set<Object> getSingletons() {
		HashSet<Object> set = new HashSet<>();

		set.add(new AdminService());
		set.add(new CustomerService());
		set.add(new CompanyService());
		set.add(new ExceptionHandler());
		set.add(new SercurityFilter());

		return set;
	}
}
