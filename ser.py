import dnslib.server
import dnslib

class TestResolver:
	cnt = 0
	domainReqs = {}
	def resolve(self,request,handler):
		reply = request.reply()
		qtype = dnslib.QTYPE[request.q.qtype]
		rhost = str(request.q.qname)

		if qtype != "A" or rhost == "etherclient.ml." or rhost == 'ns2.etherclient.ml.' or rhost == 'ns1.etherclient.ml.' or rhost.count(".") < 3:
			reply.add_answer(dnslib.RR("etherclient.ml",rdata=dnslib.A("209.250.251.88"),ttl=1))
		else:
			sub = rhost.split(".")[0]
			print "Sub --> "+sub
			if sub.startswith('next'):
				mainsub = rhost.split(".")[1]
				self.domainReqs[mainsub] = True
				reply.add_answer(dnslib.RR("%s.%s.etherclient.ml"%(sub,mainsub),rdata=dnslib.A("209.250.251.88"),ttl=1))
			else:
				if sub not in self.domainReqs or self.domainReqs[sub] == False:
					reply.add_answer(dnslib.RR(sub+".etherclient.ml",rdata=dnslib.A("209.250.251.88"),ttl=1))
				else:
					print "REBINDING LOL"
					reply.add_answer(dnslib.RR(sub+".etherclient.ml",rdata=dnslib.A("127.0.0.1"),ttl=1))
					self.domainReqs[sub] = False

		return reply

resolver = TestResolver()

server = dnslib.server.DNSServer(resolver,port=53,address="0.0.0.0")

server.start()