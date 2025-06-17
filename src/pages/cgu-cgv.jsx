import { motion } from "framer-motion";

export default function CGUCGV() {
  return (
    <div className="py-12 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-6"
      >
        Conditions Générales d’Utilisation et de Vente
      </motion.h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Objet des CGU-CGV</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation et de Vente (ci-après les « CGU-CGV ») régissent l’utilisation du site <strong>www.minimoji.fr</strong>, édité par la société BREIZHSTORM - Meneust Raphaël, ainsi que les modalités de commande des prestations proposées sur le site.
        </p>
        <h2 className="text-lg font-semibold mt-6">Champ d’application</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation et de Vente (CGU-CGV) s’appliquent à tout utilisateur accédant au site www.minimoji.fr, qu’il soit simple visiteur ou client effectuant une commande. Elles régissent l’ensemble des services proposés sur le site, en France et à l’international, dès lors que l’accès est techniquement possible. Le site s’adresse prioritairement à un public familial et particulier.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Description du service</h2>
        <p>
          Le site a pour objet de permettre à ses utilisateurs de commander des animations courtes, générées à partir de dessins d’enfants fournis par les utilisateurs eux-mêmes. Ces contenus sont produits de manière semi-automatisée grâce à des technologies d’intelligence artificielle, puis livrés sous forme de mini-clips personnalisés.
        </p>
        <h2 className="text-lg font-semibold mt-6">Format et livraison des vidéos</h2>
        <p>
          Les animations sont livrées sous format vidéo MP4, en orientation horizontale ou verticale selon la demande. La vidéo est accessible via un lien privé, hébergé sur un drive sécurisé, avec accès illimité.
        </p>
        <h2 className="text-lg font-semibold mt-6">Usage autorisé</h2>
        <p>
          Le service proposé est destiné principalement à un usage familial et non commercial. Toutefois, l’éditeur ne saurait restreindre certains usages dès lors qu’ils respectent les droits d’auteur et l’esprit du projet.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Licence d’utilisation et droits cédés</h2>
        <p>
          Les vidéos créées à partir des dessins fournis par l’utilisateur sont destinées à un usage personnel, familial ou éducatif. Minimoji concède un droit d’usage non exclusif et non commercial sur les créations remises. Toute exploitation commerciale (vente, monétisation, diffusion publique) nécessite une autorisation écrite préalable. Minimoji conserve un droit moral sur les productions, notamment pour les valoriser à titre d’exemple ou de démonstration avec accord préalable.
        </p>
        <h2 className="text-lg font-semibold mt-6">Nature du service</h2>
        <p>
          Minimoji est un service à but ludique. Il ne s’agit en aucun cas d’un outil éducatif, thérapeutique ou médical. Toute utilisation relevant de ces champs relèverait d’une interprétation personnelle et n’engage en rien la responsabilité du site ou de son éditeur.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Acceptation des conditions</h2>
        <p>
          En naviguant sur le site ou en passant commande, l’utilisateur accepte sans réserve l’ensemble des clauses décrites ci-dessous.
        </p>
        <h2 className="text-lg font-semibold mt-6">Commande et paiement</h2>
        <p>
          Le processus de commande se déroule directement via le formulaire en ligne accessible sur la page <a href="/creer" className="text-orange-500 font-semibold hover:underline">Créer mon dessin animé</a>. L’utilisateur est invité à fournir les informations nécessaires à la personnalisation de son animation, ainsi qu’à procéder au paiement sécurisé par carte bancaire via la plateforme Stripe. La commande est considérée comme valide uniquement après réception du paiement complet.
        </p>
        <h2 className="text-lg font-semibold mt-6">Tarifs et promotions</h2>
        <p>
          Les tarifs des prestations sont indiqués en euros toutes taxes comprises sur la page dédiée, en vigueur au moment de la commande. L’éditeur se réserve le droit de modifier les prix à tout moment, mais les prestations seront facturées sur la base des tarifs en vigueur au moment de l’enregistrement de la commande.
          Des promotions ponctuelles peuvent être proposées sur le site. Elles sont valables uniquement pendant la période spécifiée et dans les conditions affichées sur les supports de communication officiels de Minimoji.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Délai de réalisation</h2>
        <p>
          Le délai de livraison indiqué lors de la commande est estimatif. L’éditeur s’engage à fournir les meilleures conditions de traitement, généralement sous 24 à 48 heures, hors week-ends et jours fériés. En cas de surcharge exceptionnelle, l’utilisateur sera informé par email du nouveau délai estimé. En l’absence de livraison sous 7 jours après commande, l’utilisateur pourra demander le remboursement intégral de sa commande.
        </p>
        <h2 className="text-lg font-semibold mt-6">Rétractation et annulation</h2>
        <p>
          Conformément à l’article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés. Ainsi, toute commande passée sur Minimoji étant une création sur mesure, elle est ferme et définitive dès validation du paiement.
          <br /><br />
          Toutefois, si l’utilisateur souhaite annuler sa commande dans l’heure qui suit le paiement, et si la production n’a pas encore débuté, un remboursement intégral pourra être envisagé. Toute demande doit être formulée par e-mail à l’adresse <strong>meneust.r@gmail.com</strong>.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Réclamation et médiation</h2>
        <p>
          En cas de réclamation, l’utilisateur est invité à contacter le service client à l’adresse suivante : <strong>meneust.r@gmail.com</strong>. Conformément à l’article L612-1 du Code de la consommation, l’utilisateur peut également recourir à une procédure de médiation conventionnelle en cas de litige non résolu amiablement, sous réserve d’éligibilité à ce dispositif.
        </p>
        <h2 className="text-lg font-semibold mt-6">Responsabilités</h2>
        <p>
          L’éditeur s’efforce de maintenir le site accessible et fonctionnel en tout temps. Des interruptions temporaires peuvent cependant survenir pour des raisons de maintenance, de mises à jour ou de dysfonctionnements techniques. Ces interruptions ne sauraient donner lieu à une quelconque indemnisation.
          <br /><br />
          Les contenus présents sur le site, notamment les tarifs, délais et visuels, sont fournis à titre indicatif et peuvent être modifiés sans préavis. Ils ne constituent pas un engagement contractuel.
          <br /><br />
          Le site ne contient aucun lien tiers, à l’exception de l’interface de paiement Stripe utilisée pour finaliser les commandes. Toute tentative de contournement du formulaire, d’envoi de contenu inapproprié ou d’exploitation malveillante (scraping, injection de code, etc.) fera l’objet de poursuites et pourra entraîner un bannissement immédiat de l’utilisateur.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Contenus refusés ou inappropriés</h2>
        <p>
          Minimoji se réserve le droit de refuser toute commande incluant des dessins ou descriptions à caractère haineux, violent, discriminatoire, sexuel ou enfreignant les droits d’autrui. Toute tentative de soumission abusive entraînera l’annulation de la commande et pourra faire l’objet d’un signalement ou de poursuites.
        </p>

        <h2 className="text-lg font-semibold mt-6">Droit applicable et litiges</h2>
        <p>
          Les présentes conditions sont soumises au droit français. En cas de litige ou de différend, une solution amiable sera recherchée en priorité entre les parties. À défaut d'accord, le litige sera porté devant les tribunaux compétents de Nantes, sauf disposition légale impérative contraire.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Modification des CGU-CGV</h2>
        <p>
          L’éditeur se réserve le droit de modifier à tout moment les présentes CGU-CGV afin de les adapter à l’évolution des services proposés ou à la législation en vigueur. Les utilisateurs seront informés des mises à jour via le site, et il leur appartient de consulter régulièrement la dernière version en ligne.
        </p>
        <h2 className="text-lg font-semibold mt-6">Usage de l’intelligence artificielle</h2>
        <p>
          Les animations sont partiellement générées à l’aide de technologies d’intelligence artificielle. En passant commande, l’utilisateur accepte que des éléments puissent être interprétés ou stylisés de manière automatique. Minimoji veille à la qualité finale de la vidéo, mais ne saurait être tenu responsable de divergences artistiques mineures liées à ces processus automatiques.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Service client et contact</h2>
        <p>
          Pour toute question, réclamation ou demande d’information complémentaire, l’utilisateur peut contacter le service client à l’adresse suivante : <strong>meneust.r@gmail.com</strong>.
          Le traitement des demandes se fait dans les meilleurs délais, en général sous 48 heures ouvrées.
        </p>

        <h2 className="text-lg font-semibold mt-6">Archivage et preuve</h2>
        <p>
          Les enregistrements informatisés conservés dans les systèmes informatiques de Minimoji seront considérés comme les preuves des communications, commandes et paiements intervenus entre les parties.
          Ces informations sont archivées de manière sécurisée pendant une durée maximale de 6 mois.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Force majeure</h2>
        <p>
          Minimoji ne pourra être tenu responsable en cas d’inexécution ou de retard dans l’exécution de ses obligations résultant d’un événement de force majeure, tel que défini par la jurisprudence des juridictions françaises. Sont notamment considérés comme cas de force majeure les grèves, les pannes techniques, les catastrophes naturelles, les coupures de réseau ou tout autre événement extérieur et imprévisible.
        </p>

        <h2 className="text-lg font-semibold mt-6">Indépendance des clauses</h2>
        <p>
          Si une ou plusieurs stipulations des présentes conditions générales sont tenues pour non valides ou déclarées comme telles en application d’une loi, d’un règlement ou à la suite d’une décision définitive d’une juridiction compétente, les autres stipulations garderont toute leur force et leur portée.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl px-6 sm:px-10 py-6 shadow-md text-gray-800 dark:text-gray-200 text-sm space-y-4 max-w-3xl mx-auto mb-12">
        <h2 className="text-lg font-semibold mt-6">Entrée en vigueur</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation et de Vente sont entrées en vigueur le 1er juillet 2025. Toute mise à jour future sera signalée via une notification sur le site et indiquera sa date de prise d’effet. Les utilisateurs sont invités à consulter régulièrement cette page afin de se tenir informés de toute modification.
        </p>
      </div>
    </div>
  );
}