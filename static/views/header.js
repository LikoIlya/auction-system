export default function headerView({ profile }, emit) {
  return html`
    <header><style>body {
          padding-top: 54px;
        }

        @media (min-width: 992px) {body {
            padding-top: 56px;
          }}

        .card {
          height: 100%;
        }</style>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"><div class="container"><a class="navbar-brand" href="#">Start Bootstrap</a> <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="navbar-collapse collapse" id="navbarResponsive" style=""><ul class="navbar-nav ml-auto">${profile && html`
                    <li class="nav-item active text-white"><label class="nav-link">${profile.firstName} ${profile.lastName}</label></li>`}
              <li class="nav-item"><a class="nav-link" onclick="${handleSignOutClick}">Sign out</a></li></ul></div></div></nav></header>`;

  function handleSignOutClick(e) {
    e.preventDefault();
    emit("logout");
  }
}
