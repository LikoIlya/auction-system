import headerView from "/views/header.js";

export default function dashboardView(state, emit) {
  emit("fetch-auctions");

  const {
    auctions
  } = state;
  return html`
    <body><style>.btn-hover {
          opacity: 0.6;
          transition: 0.3s;
        }

        .btn:hover {
          opacity: 1;
        }
        .card-overlay {
          background: rgba(0, 0, 0, 0.5);
        }</style> ${headerView(state, emit)}

      <div class="container"><!-- Jumbotron Header -->
        <header class="jumbotron my-4"><h1 class="display-3">A Warm Welcome!</h1>
          <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam, eligendi, in quo sunt possimus non incidunt odit vero aliquid similique quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.</p>
          <a class="btn btn-primary btn-lg" href="#new-auction">Create new Auction</a></header>
        <div class="container"><div class="row text-center"><!-- Auctions -->
            ${auctions && auctions.map(auc => html`
              <div class="col-4 justify-content-md-center mb-4">
              <div class="card card-image d-flex flex-column text-white " style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);">
              <div class="card-overlay">
              <div style="align-items: flex-end;" class="card-img-top" >

                  </div>

                  <div style="margin-top:5%;" class="card-body"><h4 class="card-title text-center">${auc.name}</h4>
                    <p class="card-text">${auc.description}</p></div>
                  <div class="card-footer"><a href="#auction/${auc.id}" class="btn btn-primary">BET!</a>
                  </div>
                   </div> </div>
                  </div>
                  </div>
                  `)}</div></div>
        <!-- /.row --></div>
      <script>$(".delete-url").click(function() {
          alert("click");
          //here would be the code to send the DELETE request ?
        });</script></body>`;
}
//  <!--             <a data-target="#auction/${auc.id}" data-method="DELETE" //data-disabled="true" class="delete-url fas text-white fa-times-circle white //btn-md close btn-hover" aria-label="Close" style=" width:10%; margin: 3%;//"></a>
//  -->